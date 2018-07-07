//array of top 10 marker caps
var topCoins = ["bitcoin", "litecoin", "etherium", "bitcoin cash", "xrp", "stellar", "tether", "iota", "cardano"];
//images/icons of topTenCoins
var topTenImages = [
    '<img src="assets/images/btc.svg">',
    '<img src="assets/images/ltc.svg">',
    '<img src="assets/images/eth.svg">',
    '<img src="assets/images/bch.svg">',
    '<img src="assets/images/xrp.svg">',
    '<img src="assets/images/xlm.svg">',
    '<img src="assets/images/usdt.svg">',
    '<img src="assets/images/miota.svg">',
    '<img src="assets/images/ada.svg">',

];

//array to push user choices to - used to generate graphs to display
var userCoinChoice = [];

//loop to create images and append to page
for (var i = 0; i < topCoins.length; i++) {

    var newDiv = $("<div>").html(topTenImages[i] + topCoins[i]);
    newDiv.attr("data-name", topCoins[i]);
    newDiv.addClass("d-inline cryptoIcon m-2");
    $("#icons").append(newDiv);

};

//places border around selection and pushes to array
// no duplicates allowed

$(".cryptoIcon").on("click", function () {

    

    var userChoice = $(this).attr("data-name");

    var index = userCoinChoice.indexOf(userChoice);
    
//if (index !== -1) array.splice(index, 1);   

    if (index === -1) {
        $(this).addClass("border border-success");

        userCoinChoice.push(userChoice);

    } else if (index !== -1) {
        $(this).removeClass("border border-success");

        userCoinChoice.splice(index, 1);
    }

    console.log(userCoinChoice);

    });


$("#btnGo").on("click", function () {

    $("#graphs").text(userCoinChoice);

})



//function to show appropriate crypto graph upon selection of crpyto icons
/*
$("#btnGo").on("click", function (){
    var search = $(this).attr("data-name");

    //var queryUrl = ***"API GOES HERE" + search + "REST OF API GOES HERE"***

    $.ajax({
        url: queryUrl,
        method: "GET"

    }).then(function(response){
        console.log(response);

        var results = response.data;

        var graphDiv = $("<div>")

    });
});
*/


// MAP SECTION FOR GOOGLE MAPS API //
    // The var "coords" is where we define coordinates to get displayed as location markers on the map (the Crypto ATMs)
    // Ideally we can set this array equal to a bunch of lat + lng object results from a dynamic API call (that specifies current loc + distance range to search)***

    var coords = [{lat:33.86, lng:-84.33}, {lat:33.85,lng:-84.2}, {lat:33.8,lng:-84.5}, {lat:33.8,lng:-85.0}]; // These values are placeholders to test marker placements

    // FUNCTION TO CALL THE COINATMFINDER API AND ADD RESULTING COORDINATES TO AN ARRAY FOR PLOTTING ON MAP
    function getATMLocs() {
        
        // Can see the complete JSON of results at this URL, but can't yet add attribute syntax or get ajax call working...
        var queryURL = "https://www.coinatmfinder.com/CoimATMs-API.php" // + "&distance=20mi" + "&location=lat/lng OR location-input;
        
        //ajax call for ATM location data. Not working right yet.
        $.ajax({
            url: queryURL,
            method: "GET", // GET needed to be in "";
    
        }).then(function(response) {     // When the API is called, run this function...
            console.log("URL " + queryURL);
            console.log("returned " + response);
            
            // put the JSON result of objects into a variable
            var results = response.data;
            
            // then, loop through results and add the LAT + LNG coords of each one to the coords array, used to plot markers on map
            // this syntax is probably wrong, but think this approach might work if I can get the API working
            for (var i = 0; i < results.length; i++) {
                coords.push(response.position.latitude[i], response.position.latitude[i]);
                //add lat and long for each result[i] to coords array
                //they will later be created via loop within initMap function
            }
        });
    }

    // FUNCTION TO CREATE AND DISPLAY A MAP WITH AUTOCOMPLETE SEARCH FUNCTION APPLIED TO THE SEARCH BAR
    // specifies a bunch of data capture and display / zoom conditions when a new location is picked from search bar
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
        
        // Define the function that adds markers to the map we're creating
        function addMarker(coords) {
            var marker = new google.maps.Marker({
                position: coords,
                map: map,
            })
        }

        // Define the for-loop to cycle through coords array and add markers for each lat:lng object, using the addMarker function
        for (var i=0; i < coords.length; i++) {
            addMarker(coords[i]);
        }  

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
      
getATMLocs();