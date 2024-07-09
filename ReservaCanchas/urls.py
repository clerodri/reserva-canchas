
from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from django.conf import settings
from usuarios.views import index_view
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path("reservas/", include('Reserva.urls')),
    path("usuarios/", include('usuarios.urls')),
    path("", RedirectView.as_view(url='/usuarios/login_user', permanent=True)),
    path('home', index_view, name='home'),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
