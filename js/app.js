$(document).ready(function($) {

 function initialize() {

 // Loads generic map on page ready

 	var myLatlng = new google.maps.LatLng(38.833882, -104.821363);
	var mapOptions = {
		  zoom: 4,
		  center: myLatlng,
		  mapTypeId: google.maps.MapTypeId.HYBRID
	};

	var map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);

      }

      google.maps.event.addDomListener(window, 'load', initialize);

});


// Collect user submitted zipcode

$('.form').submit( function(event){

  		// get the value of the zipcode user submitted to zip form
		var location = $(this).find("input[name='zip']").val();

		console.log(location);

});



	
