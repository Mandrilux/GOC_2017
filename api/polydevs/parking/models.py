from django.db import models

class Parking(models.Model):
    """SIZE_CHOICES = (
        ('Small', 'Small'),
        ('Medium', 'Medium'),
        ('Large', 'Large'),
    )
    BOOK_FOR_CHOICES = (
        ('Disabled', 'Disabled'),
        ('Default', 'Default'),
        ('Electric', 'Electric'),
    )
    VEHICLE_TYPE_CHOICES = (
        ('Car', 'Car'),
        ('MotoCycle', 'MotoCycle'),
        ('Truck', 'Truck')
    )"""
    is_free = models.BooleanField(default=True)
    is_paying = models.BooleanField(default=False)
    lat = models.FloatField()
    lon = models.FloatField()
    updated = models.DateTimeField(auto_now=True)
    frequency = models.CommaSeparatedIntegerField(max_length=7, default="0,0,0,0,0,0,0")
    size = models.CharField(
        max_length=6,
        default="Medium",
    )
    book_for = models.CharField(
        max_length=8,
        default="Default",
    )
    vehicle_type = models.CharField(
        max_length=9,
        default="Car",
    )
    def __str__(self):
        return "parking {0} {0}".format(self.lat, self.lon)