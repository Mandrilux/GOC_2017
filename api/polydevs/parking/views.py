from django.shortcuts import get_object_or_404
from rest_framework import viewsets, filters

from parking.models import Parking
from parking.serializers import ParkingSerializer
from parking.filters import FilterParking


class MultipleFieldLookupMixin(object):
    def get_object(self):
        queryset = self.get_queryset()
        queryset = self.filter_queryset(queryset)
        filter = {}
        for field in self.lookup_fields:
            if self.kwargs[field]:
                filter[field] = self.kwargs[field]
        return get_object_or_404(queryset, **filter)

class ParkingViewSet(MultipleFieldLookupMixin,
                     viewsets.ModelViewSet):
    queryset = Parking.objects.all()
    serializer_class = ParkingSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    lookup_fields = ('lon', 'lat',)
    filter_class = FilterParking