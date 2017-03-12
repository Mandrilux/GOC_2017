var styleArray = [{      featureType: 'all',stylers: [{ saturation: -80 } ]},{featureType: 'road.arterial',elementType: 'geometry',stylers: [{ hue: '#00ffee' },{ saturation: 50 }      ]},{featureType: 'poi.business',elementType: 'labels',stylers: [{ visibility: 'off' }]}];

var locations = [
];
var HackatonPos = {lat: 49.600261599999996, lng: 6.1129177};
var map;
var markers;
var markerCluster;

function initMap(position) {
    function refreshMap() {
        $.get('http://brick-reader.com:8001/api/parking/', function( data, status ) {
            if (status == 'success')
              {
                console.log(data);
                locations = [{lat: 49.6003126, lon: 6.1132984}];
                data.results.forEach(function(elem) {
                    locations.push(elem);
                });
                refreshMarkers();
              }
              setTimeout(refreshMap, 2000);
          });
    }

    function refreshMarkers() {
        //console.log("refreshMarkers", locations);
        resetMarkers();
        markers = locations.map(function(elem) {
            console.log(elem);
            return new google.maps.Marker({
                position: {lat: elem.lat, lng: elem.lon},
                if (elem.vehicle_type == "Truck")
                {
                    if (elem.if_free === true)
                        icon: '/GOC_2017/website/web/img/delivery-truck-frontA.png';
                    else
                        icon: '/GOC_2017/website/web/img/delivery-truck-frontD.png';
                    }
                else if (elem.vehicle_type == "Car" && elem.book_for == "Default")
                {
                    if (elem.if_free === true)
                        icon: '/GOC_2017/website/web/img/sports-carA.png';
                    else
                    icon: '/GOC_2017/website/web/img/sports-carD.png';
                }
                else if (elem.vehicle_type == "Car" && elem.book_for == "Electric")
                {
                    if (elem.if_free === true)
                        icon: '/GOC_2017/website/web/img/electric-carA.png';
                    else
                    icon: '/GOC_2017/website/web/img/electric-carD.png';
                }
                else if (elem.vehicle_type == "Car" && elem.book_for == "Disabled")
                {
                    if (elem.if_free === true)
                        icon: '/GOC_2017/website/web/img/silhouette-on-wheelchairA.png';
                    else
                    icon: '/GOC_2017/website/web/img/silhouette-on-wheelchairD.png';
                }
                else if (elem.vehicle_type == "MotoCycle")
                {
                    if (elem.if_free === true)
                        icon: '/GOC_2017/website/web/img/scooter-front-viewA.png';
                    else
                    icon: '/GOC_2017/website/web/img/scooter-front-viewD.png';
                }
            });
        });

        markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

    }

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: new google.maps.LatLng(HackatonPos.lat, HackatonPos.lng),
        // center: new google.maps.LatLng(49.6088233, 6.1163861),
        styles: styleArray,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        });

    function resetMarkers() {
        if (markerCluster)
            markerCluster.clearMarkers();
        markers = [];
        markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

    }
    refreshMap();
}
