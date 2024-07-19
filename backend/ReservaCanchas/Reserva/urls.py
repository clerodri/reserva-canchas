from django.urls import path
from .views import *



urlpatterns = [
    path("canchas/",CanchaCreateView.as_view(), name="canchas"),
    path('reservas/', ReservaCreateView.as_view(), name='reservas'),
    path('reservas/new/', ReservaCreateView.as_view(), name='add-reserva'),
    path('horarios/', HorarioCreateView.as_view(),name='horarios'),
    path("horarios/<int:id_cancha>", HorarioByCanchaCreateView.as_view(), name=""),
    
    path("user/<int:persona_id>",getUserDataById, name="getUserDataById"),
    path("info-reservas",reservas, name="reservas"),
    path('pagos/new/', PagoCreateView.as_view(), name='add-pago'),
    path('pagos/', PagoCreateView.as_view(), name='pagos'),
    
    
    path('<int:pk>', ReservaDetailView.as_view(), name='detail-reserva'),
]