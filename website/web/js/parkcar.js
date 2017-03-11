function get3Parkcar() {
    console.log("refresh 3car");
    $.get("https://api.tfl.lu/v1/Occupancy/CarPark", (req, res) -> {
    res.header("Access-Control-Allow-Origin", "*"); //important, otherwise its not working
    console.log("ok");
      setTimeout(get3Parkcar, 5000);
 });
    }
    
      $( document ).ready(function() {
          console.log( "document loaded" );
          get3Parkcar()
      });
