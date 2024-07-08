from rest_framework import serializers
from .models import Reserva
from .models import Pago
from .models import Horario
from .models import Cancha
from .models import Persona

class CanchaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cancha
        fields = ['nombre']

class HorarioSerializer(serializers.ModelSerializer):
    cancha = CanchaSerializer(read_only=True)
    class Meta:
            model = Horario
            fields = ['id','hora_inicio','hora_fin','cancha']

class ReservaSerializer(serializers.ModelSerializer):
    horario = HorarioSerializer(read_only=True)
    class Meta:
        model = Reserva
        fields = ['horario', 'persona']

class ReservaCreateSerializer(serializers.ModelSerializer):

    horario = serializers.PrimaryKeyRelatedField(queryset=Horario.objects.all())
    persona = serializers.PrimaryKeyRelatedField(queryset=Persona.objects.all())
    class Meta:
        model = Reserva
        fields = ['horario', 'persona']


class PagoSerializer(serializers.ModelSerializer):
   # reserva = ReservaSerializer(read_only = True)
    reserva = serializers.PrimaryKeyRelatedField(queryset=Reserva.objects.all())
    class Meta:
        model = Pago
        fields = ['reserva','fecha_creacion','total']