from django.shortcuts import render
from rest_framework.response import Response

def hello_world(request):
    return render(request, 'hello_world')
