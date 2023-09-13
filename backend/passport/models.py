from django.db import models
from countries.models import Country

class CountryVisit(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name='country')
    user_id = models.CharField(max_length=255)
    about = models.TextField(blank=True, null=True)
    date_visited = models.DateField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self) -> str:
        return self.country_iso3 + " " + self.user_id
