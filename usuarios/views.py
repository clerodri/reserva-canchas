from django.shortcuts import render
from Reserva.models import  Persona
from django.shortcuts import render, redirect
from .forms import RegistroForm
from django.contrib.auth import logout, login, authenticate
from django.contrib.auth.forms import  AuthenticationForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required
import logging
from django.http import JsonResponse
# Create your views here.
# Configure logging
logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)



@login_required
def index_view(request):
     return render(request, 'index.html')



@login_required
def current_user(request):
    user = request.user
    try:
        persona = Persona.objects.get(user=user)
        persona_data = {
            'id': persona.id,
            'nombre': persona.nombre +" "+ persona.apellido,
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
  