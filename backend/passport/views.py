from rest_framework.response import Response
from rest_framework import status
from rest_framework.mixins import CreateModelMixin, ListModelMixin 
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import CountryVisit
from .serializers import UserSerializer, CountryVisitSerializer, AddCountryVisitSerializer

# Only allow the admin user to view all country visits
# /users/
class UserViewSet(ListModelMixin, GenericViewSet):
    queryset = CountryVisit.objects.values('user_id').distinct()
    serializer_class = UserSerializer 
    permission_classes = [IsAdminUser]
    lookup_field = 'id'
    
# /users/<user_id>/countries/
class CountryVisitViewSet(CreateModelMixin, ListModelMixin, GenericViewSet):
    serializer_class = CountryVisitSerializer 
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method in ['POST']:
            return AddCountryVisitSerializer
        return CountryVisitSerializer

    def get_permissions(self):
        if self.request.method in ['POST']:
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def get_queryset(self):
        return CountryVisit.objects.select_related('country').filter(user_id=self.kwargs['user_id'])

    def get_serializer_context(self):
        return {'user_id': self.kwargs['user_id'] }
    

    def create(self, request, *args, **kwargs):
        is_list = isinstance(request.data, list)
        serializer = AddCountryVisitSerializer(data=request.data, many=is_list, context=self.get_serializer_context())
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

