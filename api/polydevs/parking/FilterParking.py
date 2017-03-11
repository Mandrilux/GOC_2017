from django_filters import rest_framework as filters

class FilterParking(filters.FilterSet):
    toto = filters.CharFilter()