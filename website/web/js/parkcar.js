function get3Parkcar() {
    console.log("refresh 3car");
    $.get('https://api.tfl.lu/v1/Occupancy/CarPark', function( data, status ) {
        if (status == 'success')
          {
            console.log(data);
          }
          setTimeout(get3Parkcar, 5000);
      });
    }


      $( document ).ready(function() {
          console.log( "document loaded" );
          get3Parkcar()
      });
