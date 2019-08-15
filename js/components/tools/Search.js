class Search extends BasicTool {
    constructor(button_id,button_class,placeholder,icon_url){
        super(button_id,button_class,placeholder,icon_url)
        //this.button = this.addHTMLSearchButton("right-nav-search-tool","right-nav-button")    
        this.attachSearchButtonListener()
        this.generateSearchBox("pac-input","controls")
        this.attachSearchBoxListener()
    }
    // HTML Generators
    generateSearchBox(searcBox_id,searchBox_class){
        //search Input textbox
        this.inputBox = document.createElement("input");
        this.inputBox.setAttribute("type", "text");
        this.inputBox.setAttribute("class", searchBox_class);
        this.inputBox.setAttribute("id", searcBox_id);
        this.inputBox.setAttribute("style","display: none;")
        this.inputBox.setAttribute("placeholder","Borchee Search")
        // predictions container
        this.predictionBox = document.createElement("div");
        this.predictionBox.setAttribute("class", "pac-container pac-logo");
        this.predictionBox.setAttribute("style","display: none;")

        document.body.appendChild(this.inputBox);
        document.body.appendChild(this.predictionBox);
        //this.searchBox = new google.maps.places.SearchBox(this.inputBox)
    }
    generateSearchItemPrediction(item,item_place_id,item_place_all){
        let pacItem = document.createElement("div")
        if (item_place_id==0){
            pacItem.setAttribute("class","pac-item pac-item-first")
        }
        else{
            pacItem.setAttribute("class","pac-item pac-item-middle")
        }
        if (item_place_id==item_place_all){
            pacItem.setAttribute("class","pac-item pac-item-last")
        }
        switch(item.type){
            case "Hut":
                pacItem.innerHTML = `<i class="fas fa-home"></i>`
                break
            case "Waterfall":
                pacItem.innerHTML = `<i class="fas fa-water"></i>`
                break
            case "Cave":
                pacItem.innerHTML = `<i class="fas fa-ghost"></i>`
                break
            case "Campsite":
                pacItem.innerHTML = `<i class="fas fa-campground"></i>`
                break
            default:
                pacItem.innerHTML = `<i class="fas fa-map-marker-alt"></i>`
        }

        pacItem.innerHTML += `
            <span class="pac-item-query">${item.name}</span>
            <span class="pac-item-sub">${item.type}</span>`

        return pacItem
    }
    // Methods
    hideSearch(){
        this.inputBox.style.display="none"
        this.predictionBox.style.display="none"
    }
    // Event Listeners
    attachSearchButtonListener(){
        var self = this
        this.button.addEventListener("click", function(){
            if (self.inputBox.style.display === "none") {
                self.inputBox.style.display = "block";
            } else {
                self.hideSearch()
            }
        })
    }
    attachSearchBoxListener(){
        var self = this
        var sfunction = function() {
            if (self.inputBox.value.length < 3){
                return
            }
            Promise.all([
                self.searchBoxInternalPredicts(self.inputBox.value,5),
                self.searchBoxGooglePredicts(self.inputBox.value,5)]
            ).then(function(result){
                let predictions = result.flat(1)
                self.predictionBox.innerHTML=null
                for (var i in predictions){
                    let item = predictions[i]
                    let pacItem = self.generateSearchItemPrediction(item,i,predictions.length)
                    self.predictionBox.appendChild(pacItem)
                    pacItem.addEventListener("click", function(){
                        self.getPredictionCoordinates(item)
                        .then(function(result){
                            app.map.center(result.lat,result.lng); 
                            if(item.repo=="internal"){
                                app.map.zoom(14)
                            }else{
                                app.map.fitBounds(result.bounds);
                            }
                            
                            self.predictionBox.style.display="none"
                        })
                        
                    })
                }

                self.predictionBox.style.display="block"
            })
        }
        self.inputBox.addEventListener('keyup', sfunction)
        self.inputBox.addEventListener('click', sfunction)
    }
    searchBoxInternalPredicts(searchInput,n){
        var self = this
        return new Promise(function(resolve, reject) {
            let predictions = []
            let counter = 0
            for (var layer_i in app.layers){
                for(var element_i in app.layers[layer_i].elements){
                    let element = app.layers[layer_i].elements[element_i]
                    if(element.name != null){
                        if(element.name.toLowerCase().match(new RegExp(searchInput.toLowerCase(),"g"))){
                            predictions.push({
                                name: element.name, 
                                type: element.constructor.name,
                                id: element.id,
                                repo: "internal"})
                            counter++
                        }
                    }
                    if (counter == n){
                        break
                    }
                }
            }
            resolve(predictions)
        })
    }
    searchBoxGooglePredicts(searchInput,n){
        var self = this
        return new Promise(function(resolve, reject) {
            let predictions = []
            let counter = 0
            let req = {input: searchInput}
            app.map.autocomplete.getQueryPredictions(req,function(gpredictions){
                for(let i=0; i<n; i++){
                    predictions.push({
                        name: gpredictions[i].description.split(",").shift(), 
                        type: gpredictions[i].description.split(",").slice(1).join(","), 
                        id: gpredictions[i].place_id,
                        repo: "google"})
                }
                resolve(predictions)
            })
        })
    }
    getPredictionCoordinates(item){
        console.log(item)
        return new Promise(function(resolve, reject) {
            let coordinates = {lat:0, lng:0}
            if(item.repo=="google"){
                var result
                app.map.geocoder.geocode({'placeId': item.id}, function(results, status) {
                    console.log(results)
                    coordinates.lat = results[0].geometry.location.lat()
                    coordinates.lng = results[0].geometry.location.lng()
                    coordinates.bounds = results[0].geometry.bounds
                    
                    if(coordinates.lat!=0 && coordinates.lng!=0){
                        resolve(coordinates)
                    }
                    else{
                        reject("Something bad happened in the Coordinates resolver Promise")
                    }
                })
            }
            if(item.repo=="internal"){
                for(var i in app.layers[item.type.toLowerCase()].elements){
                    var element = app.layers[item.type.toLowerCase()].elements[i]

                    if(element.id == item.id){
                        coordinates.lat = element.coordinates.lat
                        coordinates.lng = element.coordinates.lng
                    }
                }
                if(coordinates.lat!=0 && coordinates.lng!=0){
                    resolve(coordinates)
                }
                else{
                    reject("Something bad happened in the Coordinates resolver Promise")
                }
            }
        })
    }
}


//