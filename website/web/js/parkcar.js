var styleArray = [{      featureType: 'all',stylers: [{ saturation: -80 } ]},{featureType: 'road.arterial',elementType: 'geometry',stylers: [{ hue: '#00ffee' },{ saturation: 50 }      ]},{featureType: 'poi.business',elementType: 'labels',stylers: [{ visibility: 'off' }]}];

var locations = [
];
var HackatonPos = {lat: 49.600261599999996, lng: 6.1129177};
var map;
var markers;
var markerCluster;

function initMap(position) {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: new google.maps.LatLng(HackatonPos.lat, HackatonPos.lng),
        styles: styleArray,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        });


    refreshMap();

}

function refreshMap() {
            refreshMarkers();
            setTimeout(refreshMap, 2000);
}


function resetMarkers() {
    if (markerCluster)
        markerCluster.clearMarkers();
    markers = [];
    markerCluster = new MarkerClusterer(map, markers,
    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

}

function refreshMarkers() {
    resetMarkers();
    markers = locations.map(function(elem) {
            if (elem.vehicle_type == "Truck")
                if (elem.is_free === true)
                    return new google.maps.Marker({
                        position: {lat: elem.lat, lng: elem.lon},
                                    icon: '/GOC_2017/website/web/img/delivery-truck-frontA.png'
                                });
                else
                    return new google.maps.Marker({
                        position: {lat: elem.lat, lng: elem.lon},
                        icon: '/GOC_2017/website/web/img/delivery-truck-frontD.png'
                    });
            else if (elem.vehicle_type == "Car" && elem.book_for == "Default")
            {
                if (elem.is_free === true)
                    return new google.maps.Marker({
                        position: {lat: elem.lat, lng: elem.lon},
                        icon: '/GOC_2017/website/web/img/sports-carA.png'
                    });
                else
                    return new google.maps.Marker({
                        position: {lat: elem.lat, lng: elem.lon},
                        icon: '/GOC_2017/website/web/img/sports-carD.png'
                    });
            }
            else if (elem.vehicle_type == "Car" && elem.book_for == "Electric")
            {
                if (elem.is_free === true)
                    return new google.maps.Marker({
                        position: {lat: elem.lat, lng: elem.lon},
                    icon: '/GOC_2017/website/web/img/electric-carA.png'
                });
                else
                    return new google.maps.Marker({
                        position: {lat: elem.lat, lng: elem.lon},
                    icon: '/GOC_2017/website/web/img/electric-carD.png'
                });
            }
            else if (elem.vehicle_type == "Car" && elem.book_for == "Disabled")
            {
                if (elem.is_free === true)
                    return new google.maps.Marker({
                        position: {lat: elem.lat, lng: elem.lon},
                        icon: '/GOC_2017/website/web/img/silhouette-on-wheelchairA.png'
                    });
                else
                    return new google.maps.Marker({
                        position: {lat: elem.lat, lng: elem.lon},
                    icon: '/GOC_2017/website/web/img/silhouette-on-wheelchairD.png'
                });
            }
            else if (elem.vehicle_type == "MotoCycle")
            {
                if (elem.is_free === true)
                    return new google.maps.Marker({
                        position: {lat: elem.lat, lng: elem.lon},
                        icon: '/GOC_2017/website/web/img/scooter-front-viewA.png'
                    });
                else
                    return new google.maps.Marker({
                        position: {lat: elem.lat, lng: elem.lon},
                    icon: '/GOC_2017/website/web/img/scooter-front-viewD.png'
                });
            }
            else {
                return new google.maps.Marker({
                    position: {lat: elem.lat, lng: elem.lon},
            });
            }
        });
    markerCluster = new MarkerClusterer(map, markers,
    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}
