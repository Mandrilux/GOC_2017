var styleArray = [{      featureType: 'all',stylers: [{ saturation: -80 } ]},{featureType: 'road.arterial',elementType: 'geometry',stylers: [{ hue: '#00ffee' },{ saturation: 50 }      ]},{featureType: 'poi.business',elementType: 'labels',stylers: [{ visibility: 'off' }]}];

var locations = [
    {lat: 49.6003126, lng: 6.1132984}
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
                //console.log(data);
                locations = [{lat: 49.6003126, lng: 6.1132984}];
                data.results.forEach(function(elem) {
                    locations.push({lat: elem.lat, lng: elem.lon});
                });
                refreshMarkers();
              }
              setTimeout(refreshMap, 2000);
          });
    }

    function refreshMarkers() {
        //console.log("refreshMarkers", locations);
        resetMarkers();
        markers = locations.map(function(location) {
            return new google.maps.Marker({
                position: location,
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
        markerCluster.clearMarkers();
        markers = [];
        markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

    }
    refreshMap();
}
