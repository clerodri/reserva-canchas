
from django.contrib import admin
from django.urls import path, include
from Reserva.views import *
from django.views.generic import RedirectView
from django.conf import settings
from usuarios.views import index_view
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
#    path("reserva/", include('Reserva.urls')),
    path("usuarios/", include('usuarios.urls')),
    path("", RedirectView.as_view(url='/usuarios/login_user', permanent=True)),
    path('home', index_view, name='home'),
    path("horariosfull/<int:id_cancha>", getHorariosByCanchaFull, name="getHorariosByCanchaFull"),
    path("canchas",getCanchas, name="getCanchas"),
    path("user/<int:persona_id>",getUserDataById, name="getUserDataById"),
    path("info-reservas",reservas, name="reservas"),
    path('pagos', PagoCreateView.as_view(), name='create-pago'),
    path('reservas', ReservaCreateView.as_view(), name='reservas'),
    path('reservas/reserva', ReservaCreateView.as_view(), name='add-reserva'),
    path('reservas/<int:pk>', ReservaDetailView.as_view(), name='detail-reserva'),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
