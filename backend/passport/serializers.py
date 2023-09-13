from rest_framework import serializers
from .models import CountryVisit
from countries.serializers import CountrySerializer

class CountryVisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountryVisit
        fields = ['country', 'user_id', 'date_visited', 'about', 'created_at']

    country = CountrySerializer(read_only=True)
