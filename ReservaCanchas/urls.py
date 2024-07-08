"""
URL configuration for ReservaCanchas project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from Reserva.views import *
from django.shortcuts import render
from django.contrib.auth import login
from django.views.generic import RedirectView
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path("reserva/", include('Reserva.urls')),
    path("reserva/", include('django.contrib.auth.urls')),
    path('admin/', admin.site.urls),
    path("", RedirectView.as_view(url='/reserva/login_user', permanent=True)),
    path('home', IndexView.as_view(), name='home'),
   # path('login/', login_request, name='login'),
    
    path("getInfoCanchaById/<int:id_cancha>", getInfoCanchasById, name="getInfoCanchasById"),
    path("horarios/<int:id_cancha>", getHorariosByCancha, name="getHorariosByCancha"),
    path("horariosfull/<int:id_cancha>", getHorariosByCanchaFull, name="getHorariosByCanchaFull"),
    # path("reservas/", getReservasAll, name="getReservasAll"),
    path("horarios/",getHorariosAll, name="getHorariosAll"),
    path("canchas",getCanchas, name="getCanchas"),
   # path("reservas/<int:horario_id>",getReservasByHorario, name="getReservasByHorario"),
    path("user/<int:persona_id>",getUserDataById, name="getUserDataById"),
    path("info-reservas",reservas, name="reservas"),
    
    path('pagos', PagoCreateView.as_view(), name='pago-create'),
    path('reservas', ReservaCreateView.as_view(), name='reserva-create'),
    path('reservas/<int:pk>', ReservaDetailView.as_view(), name='reserva-detail'),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
