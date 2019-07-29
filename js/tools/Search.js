class Search extends BasicTool {
    constructor(button_id,button_class,placeholder,icon_url){
        super(button_id,button_class,placeholder,icon_url)
        //this.button = this.addHTMLSearchButton("right-nav-search-tool","right-nav-button")    
        this.inputBox = this.addHTMLSearchBox("pac-input","controls")
        this.searchBox = new google.maps.places.SearchBox(this.inputBox)
        
        this.addButtonListener()
        this.addSearchBoxListener()
    }

    // HTML Generators
    addHTMLSearchBox(searcBox_id,searchBox_class){
        var searchBox = document.createElement("input");
        searchBox.setAttribute("type", "text");
        searchBox.setAttribute("class", searchBox_class);
        searchBox.setAttribute("id", searcBox_id);
        searchBox.setAttribute("style","display: none;")
        searchBox.setAttribute("placeholder","Borchee Search")
        document.body.appendChild(searchBox);
        return searchBox
    }

    // Event Listeners
    addButtonListener(){
        var self = this
        this.button.addEventListener("click", function(){
            if (self.inputBox.style.display === "none") {
                self.inputBox.style.display = "block";
            } else {
                self.inputBox.style.display = "none";
            }
        })
    }
    addSearchBoxListener(){
        var self = this
        var markers = []
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        self.searchBox.addListener('places_changed', function() {
            var places = self.searchBox.getPlaces();
            console.log(places)
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
                  size: new google.maps.Size(200, 200),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(17, 34),
                  scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                //markers.push(new google.maps.Marker({
                //  map: app.map.map,
                //  icon: icon,
                //  title: place.name,
                //  position: place.geometry.location
                //}));

                if (place.geometry.viewport) {
                  // Only geocodes have viewport.
                  bounds.union(place.geometry.viewport);
                } else {
                  bounds.extend(place.geometry.location);
                }
            });
            console.log(bounds)
            app.map.map.fitBounds(bounds);
        });
    }    
}


//