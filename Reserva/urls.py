from django.urls import path
from .views import *



urlpatterns = [
    path("horariosfull/<int:id_cancha>", getHorariosByCanchaFull, name="getHorariosByCanchaFull"),
    path("canchas",getCanchas, name="getCanchas"),
    path("user/<int:persona_id>",getUserDataById, name="getUserDataById"),
    path("info-reservas",reservas, name="reservas"),
    path('pagos', PagoCreateView.as_view(), name='create-pago'),
    path('', ReservaCreateView.as_view(), name='reservas'),
    path('reserva', ReservaCreateView.as_view(), name='add-reserva'),
    path('<int:pk>', ReservaDetailView.as_view(), name='detail-reserva'),
]