from django.urls import path
from .views import login_request, logout_request, registro_request



urlpatterns = [
    path('logout_user', logout_request, name='logout'),
    path("login_user", login_request, name='login'),
    path("registro_user", registro_request, name="registro"),
]