# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-03-11 20:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parking', '0005_parking_book_for'),
    ]

    operations = [
        migrations.AddField(
            model_name='parking',
            name='vehicule_type',
            field=models.CharField(choices=[('C', 'Car'), ('MC', 'MotoCycle'), ('T', 'Truck')], default='C', max_length=2),
        ),
    ]
