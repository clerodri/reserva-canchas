# Generated by Django 5.0.6 on 2024-07-07 20:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Reserva', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='persona',
            name='apellido',
            field=models.CharField(default='Unknown', max_length=30),
        ),
        migrations.AddField(
            model_name='persona',
            name='nombre',
            field=models.CharField(default='Unknown', max_length=30),
        ),
    ]
