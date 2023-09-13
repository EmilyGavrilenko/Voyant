from django.urls import path, include
from . import views
from rest_framework_nested import routers

router = routers.DefaultRouter()
router.register('users', views.UserViewSet)
passport_router = routers.NestedDefaultRouter(router, 'users', lookup='user')
passport_router.register('countries', views.CountryVisitViewSet, basename='user-countries')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(passport_router.urls)),
]
