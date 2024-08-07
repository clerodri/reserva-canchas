
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ReservaSerializer, ReservaCreateSerializer, PagoSerializer, CanchaSerializer, HorarioSerializer
from Reserva.models import Cancha, Horario, Reserva, Persona, Pago
from django.http import JsonResponse, Http404
from django.forms.models import model_to_dict
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)
# Create your views here.

class CanchaCreateView(APIView):
     def get(self, request):
        canchas = Cancha.objects.all()
        reservas = Reserva.objects.all()
        reserva_horario_ids = reservas.values_list('horario_id', flat=True)
        for cancha in canchas:
            horarios = Horario.objects.filter(cancha=cancha.id)
            disponibilidad = any(horario.id not in reserva_horario_ids for horario in horarios)
            cancha.disponibilidad = disponibilidad
            
        canchasSerialized = CanchaSerializer(canchas, many=True)
        return Response(canchasSerialized.data, status=status.HTTP_200_OK)
  
class ReservaCreateView(APIView):
  
    def get(self, request):
        listReservas = Reserva.objects.all()
        #serializer = ReservaSerializer(listReservas, many=True)
        serializer = ReservaSerializer(listReservas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def post(self, request):
        #serializer = ReservaCreateSerializer(data=request.data)
        serializer = ReservaSerializer(data=request.data)
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

class HorarioCreateView(APIView):
    def get(self, request):
        horarios = Horario.objects.all()
        horariosSerialized = HorarioSerializer(horarios, many=True)
        return Response(horariosSerialized.data, status=status.HTTP_200_OK)

class HorarioByCanchaCreateView(APIView):
    def get(self, request, id_cancha):
        horarios = Horario.objects.filter(cancha = id_cancha)
        horariosSerializer = HorarioSerializer(horarios, many=True)
        return Response(horariosSerializer.data)


def getUserDataById( request, persona_id):
    try:
      persona = Persona .objects.get(id= persona_id)
      persona_data = model_to_dict(persona)
      return JsonResponse(persona_data, safe=False)
    except ObjectDoesNotExist:
      return JsonResponse({'error': 'User not Found'}, status=404)
    except Exception as e:
      return JsonResponse({'error': str(e)}, status=500)
    
      

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

    
def reservas(request):
  try:
    data=[]
    listReservas = Reserva.objects.all()
    #logger.info(f"reservas: {listReservas}")
    for reserva in listReservas:
        logger.info(f"reservas: {reserva}")
        modelReserva = model_to_dict(reserva)
        infoReserva = getInfoReserva(modelReserva["horario"], modelReserva["id"])
        reserva_dic ={}
        reserva_dic["id"] = modelReserva["id"]
        reserva_dic["data"] = infoReserva
        data.append(reserva_dic)
    return JsonResponse(data, safe=False)
  except Exception as e:
    return JsonResponse({'error': str(e)}, status=500)
  
  
  
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
