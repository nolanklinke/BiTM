

function initAutocomplete() {   

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7127, lng:-73.935},
        zoom: 10,
        mapTypeId: 'roadmap'
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(initialLocation);
        });
    }


// THIS SECTION CONTAINS TWO DIFFERENT FORMATS OF AJAX CALLS (only one is active)
// BOTH WORK, BUT NEITHER RESOLVES CORS ISSUE (console: "origin not found in Access-Control-Allow-Origin response header")

    var queryURL = 'https://www.coinatmfinder.com/CoimATMs-API.php'

        // ajax call for ATM location data
        $.ajax({
            url: queryURL,
            method: "GET", 

        }).then(function(response) {  // When the API is called, run this function...
            var data = JSON.parse(response); // Parse the results nicely into JSON format

            for (var i = 0; i < data.length; i++) { // Loop through JSON and create markers at latLng
                var latLng = new google.maps.LatLng(data[i].lat, data[i].lng);
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map
                });
                
                addInfoText(marker, i);
                }

                function addInfoText(marker, i) {
                    var contentString = 
                        '<div id="content">'+
                        '<div id="siteNotice">'+'</div>'+
                        '<h6 id="locationInfo" class="firstInfo">' + data[i].location+ '</h6>'+
                        '<h7 id="addressInfo" class = "secondInfo">' + data[i].address + ", " + data[i].city + ", " + data[i].state + " " + data[i].zipcode + '</h7>' +
                        '<br \>' + '<h7 id="currencyInfo" class="thirdInfo">' + "Currencies: " + data[i].currency + '</h7>' +
                        '</div>' +
                        '</div>';
            
                    var infowindow = new google.maps.InfoWindow({
                        content: contentString
                    })

                    marker.addListener('click', function() {
                        infowindow.open(map, marker)
                    });
                }
            });
      
    // Another AJAX CALL format (xml) ... commented out for now
    // only here as a (failed) attempt to solve CORS issue

        // var xmlhttp = new XMLHttpRequest();
        // xmlhttp.onreadystatechange = function() {
        //     if (this.readyState == 4 && this.status == 200) {
        //         var data = JSON.parse(this.responseText);
            
        //         for (var i = 0; i < data.length; i++) {
        //             var latLng = new google.maps.LatLng(data[i].lat, data[i].lng)
        //             console.log(latLng)
        //             var marker = new google.maps.Marker({
        //                 position: latLng,
        //                 map: map,
        //                 title: location[i],
        //             });

        //             addInfoText(marker, i);
        //         }

        //         function addInfoText(marker, i) {
        //             var contentString = 
        //             '<div id="content">'+
        //             '<div id="siteNotice">'+'</div>'+
        //             '<h5 id="locationInfo" class="firstInfo">' + data[i].location+ '</h5>'+
        //             '<h6 id="addressInfo" class = "secondInfo">' + data[i].address + ", " + data[i].zipcode + " " + data[i].state +'</h6>' +
        //             '<h6 id="currencyInfo" class="thirdInfo">' + "Currencies: " + data[i].currency + '</h6>' +
        //             '</div>' +
        //             '</div>';
                
        //             var infowindow = new google.maps.InfoWindow({
        //                 content: contentString
        //             })

        //             marker.addListener('click', function() {
        //                 infowindow.open(map, marker)
        //             });
        //         }
        //     }
        // };

        // xmlhttp.open("GET", "https://www.coinatmfinder.com/CoimATMs-API.php", true);
        // xmlhttp.send();

    
    // Create the search box input from the API and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }
