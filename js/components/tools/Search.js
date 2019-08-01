class Search extends BasicTool {
    constructor(button_id,button_class,placeholder,icon_url){
        super(button_id,button_class,placeholder,icon_url)
        //this.button = this.addHTMLSearchButton("right-nav-search-tool","right-nav-button")    
        this.attachButtonListener()
        this.createSearchBox("pac-input","controls")
        this.attachSearchBoxListener()
    }

    // HTML Generators
    createSearchBox(searcBox_id,searchBox_class){
        this.inputBox = document.createElement("input");
        this.inputBox.setAttribute("type", "text");
        this.inputBox.setAttribute("class", searchBox_class);
        this.inputBox.setAttribute("id", searcBox_id);
        this.inputBox.setAttribute("style","display: none;")
        this.inputBox.setAttribute("placeholder","Borchee Search")
        document.body.appendChild(this.inputBox);
        this.searchBox = new google.maps.places.SearchBox(this.inputBox)
    }

    // Event Listeners
    attachButtonListener(){
        var self = this
        this.button.addEventListener("click", function(){
            if (self.inputBox.style.display === "none") {
                self.inputBox.style.display = "block";
            } else {
                self.inputBox.style.display = "none";
            }
        })
    }
    attachSearchBoxListener(){
        var self = this
        var markers = []
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        self.searchBox.addListener('places_changed', function() {
            console.log("KURPO")
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

        var inputBox = document.querySelector("#pac-input")
        inputBox.addEventListener("keyup",function(){
            var pacContainer = document.querySelector(".pac-container")
            var foundElements = self.searchElements(inputBox.value)
            pacContainer.innerHTML=null
            for (var i in foundElements){
                var pacItem = document.createElement("div")
                pacItem.setAttribute("class","pac-item")
                pacItem.innerHTML = `
                    <span class="pac-icon pac-icon-marker"></span>
                    <span class="pac-item-query">
                        ${foundElements[i].name}
                    </span>
                    <span>${foundElements[i].constructor.name}</span>`
                pacContainer.appendChild(pacItem)
                pacItem.addEventListener("click", function(){
                    console.log("alabala")
                })
            }
            pacContainer.style.display="block"
        })
    }    

    searchElements(searchInput){
        let foundElements = []
        for (var layer_i in app.layers){
            for(var element_i in app.layers[layer_i].elements){
                let element = app.layers[layer_i].elements[element_i]
                //console.log(element)
                if(element.name != null){
                    if(element.name.toLowerCase().match(new RegExp(searchInput.toLowerCase(),"g"))){
                        foundElements.push(element)
                    }
                }
            }
        }
        return foundElements
    }
}


//