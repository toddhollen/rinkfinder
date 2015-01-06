$(document).ready(function($) {

var map;
var service;

function initialize() {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: new google.maps.LatLng(38.833882, -104.821363),
    zoom: 5
  });

  infoWindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);

  google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);
}

function performSearch() {
  var request = {
    bounds: map.getBounds(),
    query: 'ice rinks'
  };
  service.radarSearch(request, callback);
}

function callback(results, status) {
  if (status != google.maps.places.PlacesServiceStatus.OK) {
    alert(status);
    return;
  }
  for (var i = 0, result; result = results[i]; i++) {
    var marker = new google.maps.Marker({
      map: map,
      position: result.geometry.location
    });
  }
}

google.maps.event.addDomListener(window, 'load', initialize);
});


// Collect user submitted zipcode

$('.form').submit( function(event){

  		// get the value of the zipcode user submitted to zip form
		var location = $(this).find("input[name='zip']").val();

		console.log(location);

});



	
