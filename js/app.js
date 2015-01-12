$(document).ready(function($) {

  var map;
  var service;
  var infoWindow;

  function initialize() {
    mapCenter = new google.maps.LatLng(38.833882, -104.821363);
    
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: mapCenter,
      zoom: 5
    });
    
    infoWindow = new google.maps.InfoWindow();
    
    service = new google.maps.places.PlacesService(map);

    // google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);
    performSearch();
  }

  // function performSearch() {
  //   var request = {
  //     location: mapCenter,
  //     radius: '5',
  //     query: '#'
  //   };
    
  //   service.textSearch(request, callback);
  // }

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(place.name);
      infoWindow.open(map, this);
    });
  }

  google.maps.event.addDomListener(window, 'load', initialize);




  // Cancel defualt form submit
  $('form').on('submit', function(event){ 
    event.preventDefault(); 
  });

  // Collect user submitted zipcode
  $('input[type="submit"]').on( "click" , function(event){
      // Cancel initial submit
      event.preventDefault();

      // get the value of the zipcode user submitted to zip form
      var mapNewCenter = $('form').find("input[name='zip']").val();
      performNewSearch();

  })

  function performNewSearch() {
    var request = {
      location: mapCenter,
      radius: '10',
      query: 'rink'
    };
    
    service.textSearch(request, callback);
  }


}); // End of document.ready
