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
    // performSearch();
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
      var zipcode = $('form').find("input[name='zip']").val();

      // geocoder api string using zipcode for geometry object
      var zipCodeUrl = "http://maps.googleapis.com/maps/api/geocode/json?address="+zipcode;

      // Get the Geometry object from Geocoder API
      var geoObject = $.get( zipCodeUrl, function(response){
        // Parse geometry object to use in performSearch function
        var locationObjectParent = response.results[0];
        var locationObject = locationObjectParent.geometry.location;
        
        // Create map center to pass into performSearch
        var newMapCenter = new google.maps.LatLng(locationObject.lat, locationObject.lng);

        // Run Perform new Search
        performNewSearch(newMapCenter);
        
      });
      
      

  });



// Perform search with new Latlng
  function performNewSearch(newMapCenter) {
    var request = {
      location: newMapCenter,
      radius: '10',
      query: 'ice rink'
    };
    
    service.textSearch(request, callback);
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: newMapCenter,
      zoom: 10
    });
  }


}); // End of document.ready
