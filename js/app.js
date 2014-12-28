$(document).ready(function($) {

 function initialize() {
        var mapOptions = {
          center: { lat: 38.833882, lng: -104.821363},
          zoom: 3
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
      }
      google.maps.event.addDomListener(window, 'load', initialize);
	
});