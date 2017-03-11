from django.db import models

class Parking(models.Model):
    is_free = models.BooleanField()
    is_paying = models.BooleanField()
    lat = models.FloatField()
    lon = models.FloatField()

    def __str__(self):
        return "parking {0} {0}".format(self.lat, self.lon)