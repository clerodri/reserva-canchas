
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ReservaSerializer, ReservaCreateSerializer, PagoSerializer
from Reserva.models import Cancha, Horario, Reserva, Persona, Pago
from django.http import JsonResponse, Http404
from django.forms.models import model_to_dict
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render, redirect
from datetime import datetime
from .forms import RegistroForm
from django.contrib.auth import logout, login, authenticate
from django.contrib.auth.forms import  AuthenticationForm
from django.contrib import messages
import logging
from django.contrib.auth.decorators import login_required


# Configure logging
logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)
# Create your views here.


@login_required
def current_user(request):
    user = request.user
    try:
        persona = Persona.objects.get(user=user)
        persona_data = {
            'id': persona.id,
        }
    except Persona.DoesNotExist:
        persona_data = {
            'id': None,
        }
    return JsonResponse({
        'is_authenticated': True,
        'username': user.username,
        'email': user.email,
        **persona_data,  # Merging persona data into the response
    })

def check_authentication(request):
    if request.user.is_authenticated:
        return JsonResponse({'is_authenticated': True, 'username': request.user.username})
    else:
        return JsonResponse({'is_authenticated': False})

# class IndexView(LoginRequiredMixin, TemplateView):
# #  template_name = 'main.html'
#     template_name = 'dist/index.html'

@login_required
def index_view(request):
     return render(request, 'index.html')
 #   return render(request, 'dist/index.html')


def logout_request(request):
    logger.info(f"USER : {request.user}")
    if  request.user.is_authenticated:
        logout(request)
        messages.success(request, "Has cerrado la sesion")
        return redirect('login')
    else:
        messages.success(request, "No has iniciado sesion")
        return redirect('login')

def login_request(request):
    if request.method == 'POST':
      form = AuthenticationForm(request, data=request.POST)
      if form.is_valid():
        username = form.cleaned_data.get('username')
        password = form.cleaned_data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
          login(request, user)
          logger.info(f"User {username} authenticated successfully")
          return redirect("home")
        else:
          messages.error(request,"Error al authenticarse")
          logger.info("Authentication failed: invalid username or password.")
      else:
        messages.error(request, form.errors)
        logger.info(f"Form is not valid: {form.errors}")
    form = AuthenticationForm()    
    return render(request, template_name='login.html', 
                  context={'login_form':form})

def registro_request(request):
  if request.method == 'POST':
    form = RegistroForm(request.POST)
    if form.is_valid():
      user = form.save()
      login(request, user)
      return redirect("home")
    messages.error(request, form.errors)
# Metodo no valido, retorna formulario vacio.    
  form = RegistroForm()
  return render(request=request, template_name='registro.html', 
                  context={'registro_form':form})
  
  
class ReservaCreateView(APIView):
  
    def get(self, request):
        listReservas = Reserva.objects.all()
        serializer = ReservaSerializer(listReservas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def post(self, request):
        serializer = ReservaCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReservaDetailView(APIView):

    def get_object(self, pk):
        try:
            return Reserva.objects.get(pk=pk)
        except Reserva.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        reserva = self.get_object(pk)
        serializer = ReservaSerializer(reserva)
        return Response(serializer.data)

class PagoCreateView(APIView):
    def get(self, request):
        listpagos = Pago.objects.all()
        pagoSerializer = PagoSerializer(listpagos, many=True)
        return Response(pagoSerializer.data, status=status.HTTP_200_OK)
      
    def post(self, request):
        pagoSerializer = PagoSerializer(data = request.data, context={'request': request})
        if pagoSerializer.is_valid():
          pagoSerializer.save()
          return Response(pagoSerializer.data,status=status.HTTP_201_CREATED)
        return Response(pagoSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
      
def getUserDataById(request, persona_id):
    try:
      persona = Persona .objects.get(id= persona_id)
      persona_data = model_to_dict(persona)
      return JsonResponse(persona_data, safe=False)
    except ObjectDoesNotExist:
      return JsonResponse({'error': 'User not Found'}, status=404)
    except Exception as e:
      return JsonResponse({'error': str(e)}, status=500)
    
      
  
def getInfoCanchasById(request, id_cancha):
    cancha = Cancha.objects.get(id=id_cancha)
    cancha_data = model_to_dict(cancha)
    cancha_data['Disponibilidad'] = True
    return JsonResponse(cancha_data,safe=False)
  
def getHorariosByCancha(request, id_cancha):
    try:
        horarios = Horario.objects.filter(cancha_id=id_cancha).values()
        data = list(horarios)
        return JsonResponse(data, safe=False)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Cancha or Horarios not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
  
  
def getHorariosAll(request):
    horarios = Horario.objects.all().values()
    
    return JsonResponse(list(horarios), safe=False)  

def calcularTiempo(inicio, fin):
  formato= '%H:%M'
  startTime = datetime.strptime(formatearHora(inicio),formato)
  finTime = fin.strptime(formatearHora(fin),formato)
   # Calculate the difference in hours
  time_difference = finTime - startTime
  difference_in_hours = time_difference.seconds // 3600
    
  return difference_in_hours

def formatearHora(horario):
  return horario.strftime('%H:%M')

def getInfoReserva(id_horario, id_reserva):
   data={}
   horario = Horario.objects.get(id=id_horario)
   dataHorario = model_to_dict(horario)
   cancha =  Cancha.objects.get(id=dataHorario["cancha"])
   canchaInfo = model_to_dict(cancha)
   data["horario"] = formatearHora(dataHorario["hora_inicio"])+" - "+formatearHora(dataHorario["hora_fin"])
   data["cancha"] = canchaInfo["nombre"]
   data["costo"] = canchaInfo["costo_por_hora"]
   data["Total"] = canchaInfo["costo_por_hora"] * calcularTiempo(dataHorario["hora_inicio"],dataHorario["hora_fin"])
   ##FALTA LOGICA PARA SABER SI ESTA PAGADO O NO, BUSCAR LA RESERVA EN PAGOS SI ESTA ENTONCES TRUE PAGADO SINO FALSE.
   pagos = Pago.objects.all()
   #logger.info(f"PAGOS: {pagos}")
   pago_reserva_ids = [pago.reserva.id for pago in pagos]
   if id_reserva in pago_reserva_ids:
        data["isPagado"] = True
   else:   
        data["isPagado"] = False
   return data

def getReservasAll(request):
    reservas = Reserva.objects.all().values()
    
    return JsonResponse(list(reservas), safe=False)  
    
def getHorariosByCanchaFull(id_cancha):
    data_list=[]
    horarios = Horario.objects.filter(cancha_id=id_cancha)
    logger.info(f"HORARIOS X CANCHA {id_cancha} :   {horarios}")
    for h in horarios:
      data_dic = model_to_dict(h)
      list_reservas =  Reserva.objects.filter(horario_id=h.id)
      logger.info(f"RESERVAS X HORARIO {id_cancha} :   {list_reservas}")
      if len(list_reservas) > 0:
        data_dic["reserved"] = True
      else:
        data_dic["reserved"] = False
      data_list.append(data_dic)
    return data_list

   
def isCanchaDisponible(horarios):
    reservas =  Reserva.objects.all().values()  
    ids_reservas = {reserva['horario_id'] for reserva in reservas}
    for horario in horarios:
        if horario['id'] not in ids_reservas:
            return True
    return False
  
  
def getCanchas(request):
  data=[]
  canchas = Cancha.objects.all().values()
  for c in canchas:
    horarios = getHorariosByCanchaFull(c["id"])
    if len(horarios)==0:
       c["disponible"] = True
    elif isCanchaDisponible(horarios):
         c["disponible"] = True
    else:
        c["disponible"] = False
    c["horarios"] = list(horarios)
    data.append(c)    
    # logger.info(f"c : {c.get("id")}")
  return JsonResponse(list(data), safe=False)

def getPersonaById(request,persona_id):
  try:
    persona = Persona.objects.get(id=persona_id)
    return persona
  except ObjectDoesNotExist:
      return JsonResponse({'error': 'Persona Not  Found'}, status=404)
  except Exception as e:
      return JsonResponse({'error': str(e)}, status=500)

def getReservasByHorario(request, horario_id):
  data=[]
  infoReservas={}
  try:
    reservas = Reserva.objects.get(horario_id=horario_id)
    persona = getPersonaById(request, reservas.__getattribute__("persona_id"))
   # cancha = getCanchaByHorarioId(request,horario_id)
    logger.info(f"reserva: {model_to_dict(persona)["nombre"]}")
    #data["nombre"]="ronaldo"
    infoReservas["cliente"]= model_to_dict(persona)["nombre"] + " "+ model_to_dict(persona)["apellido"]
    data.append(infoReservas)
    return JsonResponse(data, safe=False)
  except ObjectDoesNotExist:
      return JsonResponse({'error': 'Reserva Not  Found'}, status=404)
  except Exception as e:
      return JsonResponse({'error': str(e)}, status=500)
    
def reservas(request):
  try:
    data=[]
    listReservas = Reserva.objects.all()
    #logger.info(f"reservas: {listReservas}")
    for reserva in listReservas:
        logger.info(f"reservas: {reserva}")
        modelReserva = model_to_dict(reserva)
        infoReserva = getInfoReserva(modelReserva["horario"],modelReserva["id"])
        reserva_dic ={}
        reserva_dic["id"] = modelReserva["id"]
        reserva_dic["data"] = infoReserva
        data.append(reserva_dic)
    return JsonResponse(data, safe=False)
  except Exception as e:
    return JsonResponse({'error': str(e)}, status=500)