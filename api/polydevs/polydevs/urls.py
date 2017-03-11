"""polydevs URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from rest_framework_swagger.views import get_swagger_view

from parking.routers import ParkingRouter
from parking.views import ParkingViewSet

schema_view = get_swagger_view(title='Pastebin API')

router = DefaultRouter()

router2 = ParkingRouter()
router2.register(r'api/parking', ParkingViewSet, 'parking')

urlpatterns = [
    url(r'^$', schema_view),
]

urlpatterns += router.urls + router2.urls
