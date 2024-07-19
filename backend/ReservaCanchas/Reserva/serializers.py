from rest_framework import serializers
from .models import Reserva
from .models import Pago
from .models import Horario
from .models import Cancha
from .models import Persona

class CanchaSerializer(serializers.ModelSerializer):
    disponibilidad = serializers.SerializerMethodField()
    class Meta:
        model = Cancha
        fields = ['id','nombre','descripcion', 'costo_por_hora','disponibilidad']

    def get_disponibilidad(self, obj):
        return getattr(obj, 'disponibilidad', False)
class HorarioSerializer(serializers.ModelSerializer):
    cancha = CanchaSerializer(read_only=True)
    class Meta:
            model = Horario
            fields = ['id','hora_inicio','hora_fin','cancha']

class ReservaSerializer(serializers.ModelSerializer):
    horario_id = serializers.PrimaryKeyRelatedField(
        queryset=Horario.objects.all(), source='horario', write_only=True
    )
    horario = HorarioSerializer(read_only=True)
    class Meta:
        model = Reserva
        fields = ['id','horario_id','horario', 'persona']

class ReservaCreateSerializer(serializers.ModelSerializer):

    horario = serializers.PrimaryKeyRelatedField(queryset=Horario.objects.all())
    persona = serializers.PrimaryKeyRelatedField(queryset=Persona.objects.all())
    class Meta:
        model = Reserva
        fields = ['id','horario', 'persona']


class PagoSerializer(serializers.ModelSerializer):
    reserva = ReservaSerializer(read_only = True)
    reserva_id = serializers.PrimaryKeyRelatedField(
        queryset=Reserva.objects.all(), source='reserva', write_only=True)
    #reserva = serializers.PrimaryKeyRelatedField(queryset=Reserva.objects.all())
    class Meta:
        model = Pago
        fields = ['reserva_id','reserva','fecha_creacion','total']