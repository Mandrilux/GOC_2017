from rest_framework import serializers

from parking.models import Parking

class ParkingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Parking
        fields = ('lat', 'lon', 'is_free', 'is_paying')

    def create(self, validated_data):
        parking = Parking.objects.create(**validated_data)
        return parking

    def update(self, instance, validated_data):
        instance.lat = validated_data.get('lat', instance.lat)
        instance.lon = validated_data.get('lon', instance.lon)
        instance.is_free = validated_data.get('is_free', instance.is_free)
        instance.is_paying = validated_data.get('is_paying', instance.is_paying)
        instance.save()
        return instance
