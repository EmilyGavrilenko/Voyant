from rest_framework.mixins import ListModelMixin 
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Country
from .serializers import CountrySerializer

class CountryViewSet(ListModelMixin, GenericViewSet): # Only supports the list operation
    queryset = Country.objects.all()
    serializer_class = CountrySerializer 
    # permission_classes = [IsAuthenticated]