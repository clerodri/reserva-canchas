from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from Reserva.models import Persona
from django.core.exceptions import ValidationError
from django import forms 

class RegistroForm(UserCreationForm):
    nombre = forms.CharField( max_length=30)
    apellido = forms.CharField( max_length=30)
    cedula = forms.CharField( max_length=30)
    telefono = forms.CharField( max_length=30)
    
    class Meta:
      model = User
      fields = ['username','nombre','apellido','email',
                'cedula','telefono','password1','password2']
      
    def cedula_clean(self):  
        cedula = self.cleaned_data['cedula'].lower()  
        new = User.objects.filter(cedula = cedula)  
        if new.count():  
            raise ValidationError("Cedula Already Exist")  
        return cedula 
      
    def save(self, commit = True):
        user = super(RegistroForm, self).save(commit=False)
        c_nombre   = self.cleaned_data['nombre']
        c_apellido = self.cleaned_data['apellido']
        c_cedula   = self.cleaned_data['cedula']
        c_telefono = self.cleaned_data['telefono']
        if commit:
            user.save()
            persona = Persona(nombre=c_nombre, apellido=c_apellido,
                                cedula=c_cedula, telefono = c_telefono, user= user)
            persona.save()   
        return user
      

