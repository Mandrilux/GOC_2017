from django_filters import rest_framework as filters

from parking.models import Parking


class FilterParking(filters.FilterSet):
    is_free = filters.CharFilter(method='filter_is_free')
    position = filters.CharFilter(method='filter_position')

    def filter_is_free(self, queryset, name, value):
        if value and value != "All":
            return queryset.filter(is_free=value)
        return queryset

    def filter_position(self, queryset, name, value):
        if value:
            tab = value.split(',')
            print(tab)
            return queryset.filter(lon__range=(float(tab[0]) - 1, float(tab[0]) + 1), lat__range=(float(tab[1]) - 1, float(tab[1]) + 1))
        return queryset

    class Meta:
        model = Parking
        fields = ['is_free']
