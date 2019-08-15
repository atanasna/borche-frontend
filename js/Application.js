class Application{
    constructor(){
        this.resourcer = new Resourcer()
        this.htmlBuilder = new HtmlBuilder()
        this.backendConnector = new BackendConnector()
        this.eventsHandler = new EventsHandler()
    }

    loadComponents(){
        var self = this
        this.mainWindow = new MainWindow()
        this.map = new MapHandler()
        this.layers = {}
        this.tools = []
        
        this.loadTools()

        this.loadMapElements("hut").then(
            function(){self.drawMapElements("hut")})
        this.loadMapElements("campsite").then(
          function(){self.drawMapElements("campsite")})
        this.loadMapElements("cave").then(
          function(){self.drawMapElements("cave")})
        this.loadMapElements("waterfall").then(
          function(){self.drawMapElements("waterfall")})
        this.loadMapElements('path').then(
          function(){self.drawMapElements("path")})  

        //this.loadMapElements('area').then(
        //  function(){self.drawMapElements("area")})  
    }
    loadTools(){
        var self = this
        this.tools.push(new Search(
            "right-nav-search-tool",
            "right-nav-button",
            "right-nav-tools",
            this.resourcer.icons.search.color32))

        this.tools.push(new NewElement(
            "right-nav-newelement-tool",
            "right-nav-button",
            "right-nav-tools",
            this.resourcer.icons.newitem.color32))
        // Filters
        var layers = ["hut","cave","waterfall","campsite","path"] 
        layers.forEach(function(filter){
            self.tools.push(new Filter(
            filter,
            "right-nav-"+filter+"-filter",
            "right-nav-button",
            "right-nav-filters",
            self.resourcer.icons[filter].color32,
            self.resourcer.icons[filter].scratched32))
        })   
    }
    // Loads all elements of the particular time in the elements hash
    loadMapElements(type){
        var self = this
        //Create new layer if there is none
        if(this.layers[type]==null){
            this.layers[type] = new Layer(type)
        }

        return this.backendConnector.getMapElements(type)
            .then( function(elements){
                self.layers[type].elements = elements
            })
    }
    loadMapElement(id, type){
        var self = this
        //Create new array if there is none
        if(this.layers[type]==null){
            this.layers[type] = new Layer(type)
        }

        return this.backendConnector.getMapElement(id,type)
            .then( function(element){
                console.log(element)
                self.layers[type].elements.push(element)
            })
    }
    // Creates a map marker for all elements of type:type and attaches proper Listeners
    drawMapElement(element){
        var self = this
        let type = element.constructor.name.toLowerCase()
        switch(type){
            case "path":
                element.polyline = self.map.addPolyline({
                    coordinates: element.coordinates,
                    color: element.color,
                    content: self.htmlBuilder.mapElementMinorInfo(element,type)
                })
                break
            case "area":
                element.poligon = self.map.addPoligon({
                    coordinates: element.coordinates,
                    border_color: "#4364ff",
                    fill_color: "#ffffff"
                })
                break
            default:
                if(element.approved){
                    let icon = element.constructor.icon("active")
                }
                else{
                    let icon = element.constructor.icon("pending")
                }
                element.marker = self.map.addMarker({
                    id: element.id,
                    type: type,
                    coordinates: element.coordinates,
                    icon: (element.approved) ? element.constructor.icon("active") : element.constructor.icon("pending"),
                    hoverIcon: (element.approved) ? element.constructor.icon("active_hover") : element.constructor.icon("pending_hover"),
                    clickIcon: (element.approved) ? element.constructor.icon("active_click") : element.constructor.icon("pending_click"),
                    minorContent: self.htmlBuilder.mapElementMinorInfo(element,type),
                    majorContent: self.htmlBuilder.mapElementMajorInfo(element,type)
                })
                break
        }
    }
    drawMapElements(type){
        var self = this
        this.layers[type].elements.forEach(function(element){
            self.drawMapElement(element)
        });    
        this.layers[type].createMarkerCluster()
    }
    // Show the element on the main Window of the app
    showMapElement(id,type){
        var self = this
        this.backendConnector.getMapElement(id,type)
        .then(function(element){
            self.mainWindow.body.innerHTML = self.htmlBuilder.mapElementShow(element,type)
            self.mainWindow.setVisibility(true)
            slideIndex = 1;
            showDivs(slideIndex);
        })
    }
}