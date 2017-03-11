var styleArray = [{      featureType: 'all',stylers: [{ saturation: -80 } ]},{featureType: 'road.arterial',elementType: 'geometry',stylers: [{ hue: '#00ffee' },{ saturation: 50 }      ]},{featureType: 'poi.business',elementType: 'labels',stylers: [{ visibility: 'off' }]}];

var locations = [
    {lat: 49.6003126, lng: 6.1132984}
];

var render = function()
{
        if(navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
          function(position) {

              function refreshMap() {
                  console.log("refresh");
              }


                var map = new google.maps.Map(document.getElementById('map'), {
                  zoom: 17,
                  center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                 // center: new google.maps.LatLng(49.6088233, 6.1163861),
                  styles: styleArray,
                  streetViewControl: false,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
                });

                location.push({lat: position.coords.latitude, lng: position.coords.longitude});
                var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

                var markers = locations.map(function(location, i) {
                  return new google.maps.Marker({
                    position: location,
                    label: labels[i % labels.length]
                  });
                });

                var markerCluster = new MarkerClusterer(map, markers,
                    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});


                var refresh = document.getElementById('refresh');
                google.maps.event.addDomListener(refresh, 'click', refreshMap);

        }
    );
};

function initMap() {
    render();
}
