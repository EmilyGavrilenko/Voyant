from django.db import models

class Country(models.Model):
    iso3 = models.CharField(max_length=3, primary_key=True)
    name = models.CharField(max_length=255)
    continent = models.CharField(max_length=255)
    flag = models.CharField(max_length=16)
    latitude = models.FloatField()
    longitude = models.FloatField()
    
    def __str__(self) -> str:
        return self.name

    class Meta: 
        ordering = ['name']
