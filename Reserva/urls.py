from django.urls import path
from .views import login_request, logout_request, registro_request, current_user



urlpatterns = [
    path("login_user", login_request, name='login'),
    path('logout_user', logout_request, name='logout'),
    path("registro_user", registro_request, name="registro"),
    path("current_user", current_user, name="current_user"),
]