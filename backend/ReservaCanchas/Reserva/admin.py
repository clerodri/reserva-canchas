from django.contrib import admin
from .models import Cancha, Persona, Horario, Pago, Reserva
# Register your models here.
admin.site.register(Cancha)
admin.site.register(Persona)
admin.site.register(Horario)
admin.site.register(Pago)
admin.site.register(Reserva)