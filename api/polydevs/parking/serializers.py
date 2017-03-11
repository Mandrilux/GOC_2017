from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers

from parking.models import Parking

class ParkingDetailSerializer(serializers.ModelSerializer):
    size = serializers.CharField(required=False)
    book_for = serializers.CharField(required=False)
    vehicle_type = serializers.CharField(required=False)
    lat = serializers.FloatField(required=False)
    lon = serializers.FloatField(required=False)

    class Meta:
        model = Parking
        fields = ('lat', 'lon', 'is_free', 'is_paying', 'updated', 'count', 'size', 'book_for', 'vehicle_type')

    def update(self, instance, validated_data):
        instance.lat = validated_data.get('lat', instance.lat)
        instance.lon = validated_data.get('lon', instance.lon)
        instance.is_free = validated_data.get('is_free', instance.is_free)
        instance.is_paying = validated_data.get('is_paying', instance.is_paying)
        instance.size = validated_data.get('size', instance.size)
        instance.book_for = validated_data.get('book_for', instance.book_for)
        instance.vehicle_type = validated_data.get('vehicle_type', instance.vehicle_type)
        if validated_data.get('is_free', instance.is_free) is False:
            instance.count += 1
        instance.save()
        return instance

class ParkingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parking
        fields = ('lat', 'lon', 'is_free', 'size', 'book_for', 'vehicle_type')

    def validate(self, data):
        try:
            Parking.objects.get(lon=data['lon'], lat=data['lat'])
            raise serializers.ValidationError("Postion already exist")
        except ObjectDoesNotExist:
            return data

    def create(self, validated_data):
        parking = Parking.objects.create(**validated_data)
        return parking