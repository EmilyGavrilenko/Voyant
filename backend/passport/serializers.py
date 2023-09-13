from rest_framework import serializers
from .models import CountryVisit
from countries.serializers import CountrySerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountryVisit
        fields = ['user_id']

class CountryVisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountryVisit
        fields = ['country', 'user_id', 'date_visited', 'about', 'created_at']

    country = CountrySerializer(read_only=True)


class AddCountryVisitSerializer(serializers.Serializer):
    country_id = serializers.CharField(max_length=3)
    class Meta:
        model = CountryVisit
        fields = ['country_id', 'user_id']

    
    def create(self, validated_data):
        user_id = self.context['user_id']
        return CountryVisit.objects.create(user_id=user_id, **validated_data)