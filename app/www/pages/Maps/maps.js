var iconuser = "../../img/placeholder.png";

var iconcarA =  "../../img/sports-carA.png";
var iconcarD =  "../../img/sports-carD.png";

var icontruckA =  "../../img/delivery-truck-frontA.png";
var icontruckD =  "../../img/delivery-truck-frontD.png";

var iconwheelA =  "../../img/silhouette-on-wheelchairA.png";
var iconwheelD =  "../../img/silhouette-on-wheelchairD.png";

var iconscooterA =  "../../img/scooter-front-viewA.png";
var iconscooterD =  "../../img/scooter-front-viewD.png";

var iconelectricA =  "../../img/electric-carA.png";
var iconelectricD =  "../../img/electric-carD.png";
var markers = [];


var filter = 1;

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


    var lat = 0;
    var long = 0;
    var map;



function initMap() {

  lat = 49.6002048;
  lng = 6.1129636;

    //map = new google.maps.Map(document.getElementById('map')
    map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: {lat: 49.6002048, lng: 6.1129636},
    styles: styleArray,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var marker = new google.maps.Marker({
      position: {lat: 49.6002048, lng: 6.1129636},
      map: map,
      icon: iconuser,
      title: 'Hello World!'
  });


  $.get('http://brick-reader.com:8001/api/parking/', function( data, status ) {
      if (status == 'success')
        {
          callMarker(data);
        }
  });
};


function callMarker(data)  {
      var i = 0;
      var icons = "";

      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
       markers = [];
        i = 0;

      while (data.results[i])
        {
          icons = "";
          if (data.results[i].vehicle_type == "Truck")
          {
            if (data.results[i].is_free)
              icons = icontruckA;
              else {
                icons = icontruckD;
              }
          }
          else if (data.results[i].vehicle_type == "MotoCycle")
          {
            if (data.results[i].is_free)
              icons = iconscooterA;
              else {
                icons = iconscooterD;
              }
          }
          else if (data.results[i].book_for == "Electric")
          {
            if (data.results[i].is_free)
              icons = iconelectricA;
              else {
                icons = iconelectricD;
              }
          }
          else if (data.results[i].book_for == "Disabled")
          {
            if (data.results[i].is_free)
              icons = iconwheelA;
              else {
                icons = iconwheelD;
              }
          }
          else
          {
            if (data.results[i].is_free)
              icons = iconcarA;
              else {
                icons = iconcarD;
              }
          }

        var marker = new google.maps.Marker({
              position: {lat: data.results[i].lat, lng: data.results[i].lon},
              map: map,
              icon: icons,
              title: 'Hello World!'
          });
          marker.addListener('click', callBackcount(marker, data.results[i].lat, data.results[i].lon, data.results[i].is_free));
          markers.push(marker);
          i++;
        }
}

function toggleBounce(marker, lat, lng, is_free) {

var name = "";

    name += '<div id="bodyContent">';
    if (is_free == false)
      name += '<button class="button takebutton" onclick="Available(' + lng + ',' + lat + ')">Available</button>';
    else
      name += '<button class="button takebutton" onclick="Take(' + lng + ',' + lat + ',' +  is_free +')">Take</button>';
    name += '<button class="button" onclick="Delete(' + lng + ',' + lat +')">Delete</button>';
    name += '</div>';
    name += '</div>';

    var infowindow = new google.maps.InfoWindow({content: name});
    infowindow.open(map, marker);
}

function New()
{
  var vehicle_type = "car";
  var book_for = "Default";
  var is_free = false;
  var is_paying = false;
  var book_for = "Default";


  if (document.getElementById("Truck").checked == true)
  {
    vehicle_type = "Truck";
  }
  if (document.getElementById("Motorbike").checked == true)
  {
    vehicle_type = "MotoCycle";
  }
  if (document.getElementById("Electric").checked == true)
  {
   book_for = "Electric";
  }
  if (document.getElementById("Disabled").checked == true)
  {
    book_for = "Disabled";
  }

  if (document.getElementById("Free").checked == true)
  {
    is_free = true;
  }
  if (document.getElementById("Paying").checked == true)
  {
    is_paying = true;
  }

  $.post('http://brick-reader.com:8001/api/parking/',
    {
        is_paying: is_paying,
        lat: lat,
        lon: lng,
        is_free: is_free,
        vehicle_type: vehicle_type,
        book_for: book_for,
    }, function(data) {
      $.get('http://brick-reader.com:8001/api/parking/', function( data, status ) {
          if (status == 'success')
            {
              callMarker(data);
            }
      });
  });
}

function Available(lng, lat)
{
  $.ajax({
    url: 'http://brick-reader.com:8001/api/parking/' + lng + '/' + lat + '/',
    method: 'PUT',
    data: {
      is_paying: true,
      lat: lat,
      lon: lng,
      is_free: true
    },
    success: function(result) {
      if (result != undefined)
        {
          $.get('http://brick-reader.com:8001/api/parking/', function( data, status ) {
              if (status == 'success')
                {
                  callMarker(data);
                }
          });
        }
    }
  });
}

function Take(lng, lat, is_free)
{

  $.ajax({
    url: 'http://brick-reader.com:8001/api/parking/' + lng + '/' + lat + '/',
    method: 'PUT',
    data: {
      is_paying: true,
      lat: lat,
      lon: lng,
      is_free: false
    },
    success: function(result) {
      if (result != undefined)
        {
          $.get('http://brick-reader.com:8001/api/parking/', function( data, status ) {
              if (status == 'success')
                {
                  callMarker(data);
                }
          });
        }
    }
  });

}

function Delete(lng, lat)
{
  $.ajax({
      url: 'http://brick-reader.com:8001/api/parking/' + lng + '/' + lat + '/',
      type: 'DELETE',
      success: function(result) {
            $.get('http://brick-reader.com:8001/api/parking/', function( data, status ) {
                if (status == 'success')
                  {
                    callMarker(data);
                  }
            });
          }
  });
}

function callBackcount(marker, lat, lng, is_free)
{
  return function ()
		{
			toggleBounce (marker, lat, lng, is_free);
		}
}


function changefilter(Type)
{
  filter = Type;


  if (Type == 1)
  {
    $.get('http://brick-reader.com:8001/api/parking/?vehicle_type=Car', function( data, status ) {
        if (status == 'success')
            callMarker(data);
    });
  }
  else if (Type == 2)
  {
    $.get('http://brick-reader.com:8001/api/parking/?vehicle_type=Truck', function( data, status ) {
        if (status == 'success')
            callMarker(data);
    });
  }
  else if (Type == 3)
  {
    $.get('http://brick-reader.com:8001/api/parking/?vehicle_type=MotoCycle', function( data, status ) {
        if (status == 'success')
            callMarker(data);
    });
  }
  else if (Type == 4)
  {
    $.get('http://brick-reader.com:8001/api/parking/?book_for=Electric', function( data, status ) {
        if (status == 'success')
            callMarker(data);
    });
  }
  else if (Type == 5)
  {
    $.get('http://brick-reader.com:8001/api/parking/?book_for=Disabled', function( data, status ) {
        if (status == 'success')
            callMarker(data);
    });
  }
}
