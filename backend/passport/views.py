from rest_framework.mixins import ListModelMixin 
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import CountryVisit
from .serializers import CountryVisitSerializer

class CountryVisitViewSet(ListModelMixin, GenericViewSet): # Only supports the list operation
    queryset = CountryVisit.objects.select_related('country').all()
    serializer_class = CountryVisitSerializer 
    permission_classes = [IsAuthenticated]