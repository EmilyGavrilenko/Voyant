from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.label_image)
]
