var styleArray = [
    {
      featureType: 'all',
      stylers: [
        { saturation: -80 }
      ]
    },{
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        { hue: '#00ffee' },
        { saturation: 50 }
      ]
    },{
      featureType: 'poi.business',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    }
  ];
function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: new google.maps.LatLng(49.6088233, 6.1163861),
          styles: styleArray,
          streetViewControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        var markers = locations.map(function(location, i) {
          return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
          });
        });

        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      }

        var locations = [
      {lat: 49.6003126, lng: 6.1132984}
      ];

          function maPosition(position)
          {
 
 
 		var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          console.log(latitude);
          console.log(longitude);
 
 }
 
 if(navigator.geolocation)
   navigator.geolocation.getCurrentPosition(maPosition);

