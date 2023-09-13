from rest_framework import serializers
from .models import Country

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['iso3', 'name', 'continent', 'flag', 'latitude', 'longitude']