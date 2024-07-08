from django.db import models
from django.utils import timezone


# Create your models here.
class Persona (models.Model):
    nombre = models.CharField(max_length=30,default='Unknown')
    apellido = models.CharField(max_length=30, default='Unknown')
    cedula = models.CharField(max_length=10)
    telefono = models.CharField(max_length=30,null=True, blank=True)
    user = models.OneToOneField('auth.user', on_delete=models.PROTECT, related_name='user', default=None)

class Cancha (models.Model):
    nombre = models.CharField(max_length=30)
    descripcion = models.CharField(max_length=200)
    costo_por_hora = models.FloatField(default=0)
    
class Horario (models.Model):
    hora_inicio = models.DateTimeField(default=timezone.now)
    hora_fin = models.DateTimeField(default=timezone.now)
    cancha = models.ForeignKey('Cancha', on_delete=models.PROTECT, related_name='cancha')

class Reserva (models.Model):
    fecha_creacion = models.DateTimeField(default=timezone.now)
    hora_fin = models.DateTimeField(default=timezone.now)
    persona = models.ForeignKey('Persona', on_delete=models.PROTECT, related_name='persona')
    horario = models.ForeignKey('Horario', on_delete=models.PROTECT, related_name='horario')
    esta_anulada = models.BooleanField(default = False)


class Pago(models.Model):
    fecha_creacion = models.DateTimeField(default=timezone.now)
    reserva = models.ForeignKey('Reserva', on_delete=models.PROTECT, related_name='reserva')
    total = models.FloatField(default=0)