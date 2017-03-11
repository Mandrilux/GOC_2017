import datetime
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers

from parking.models import Parking

class ParkingDetailSerializer(serializers.ModelSerializer):
    DAY_MAP = {
        "Monday": 0,
        "Tuesday": 1,
        "Wednesday": 2,
        "Thursday": 3,
        "Friday": 4,
        "Saturday": 5,
        "Sunday": 6,
    }
    size = serializers.CharField(required=False)
    book_for = serializers.CharField(required=False)
    vehicle_type = serializers.CharField(required=False)
    lat = serializers.FloatField(required=False)
    lon = serializers.FloatField(required=False)
    frequency = serializers.SerializerMethodField()

    class Meta:
        model = Parking
        fields = ('lat', 'lon', 'is_free', 'is_paying', 'updated', 'size', 'book_for', 'vehicle_type', 'frequency')

    def get_frequency(self, obj):
        frequency = list(map(int, obj.frequency.split(',')))
        result = list()
        for row in frequency:
            result.append(str(round(row * 100 / sum(frequency), 1)) + " %")
        return result

    def update(self, instance, validated_data):
        instance.lat = validated_data.get('lat', instance.lat)
        instance.lon = validated_data.get('lon', instance.lon)
        instance.is_free = validated_data.get('is_free', instance.is_free)
        instance.is_paying = validated_data.get('is_paying', instance.is_paying)
        instance.size = validated_data.get('size', instance.size)
        instance.book_for = validated_data.get('book_for', instance.book_for)
        instance.vehicle_type = validated_data.get('vehicle_type', instance.vehicle_type)
        if validated_data.get('is_free', instance.is_free) is False:
            now = datetime.datetime.now()
            pos = self.DAY_MAP[now.strftime("%A")]
            frequency = instance.frequency.split(',')
            frequency[pos] = str(int(frequency[pos]) + 1)
            instance.frequency = ','.join(frequency)
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