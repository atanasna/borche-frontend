class Application{
    constructor(){
        this.map = new MapsHandler()
        this.htmlBuilder = new HtmlBuilder()
        this.backendConnector = new BackendConnector()
        this.eventsHandler = new EventsHandler()
        this.layers = {}

        this.eventsHandler.attachInitialListeners()
    }

    // Loads all elements of the particular time in the elemnts hash
    loadMapElements(type){
        var self = this
        //Create new array if there is none
        if(this.layers[type]==null){
            this.layers[type]={},
            this.layers[type].visible = true,
            this.layers[type].elements = []
        }

        return this.backendConnector.getMapElements(type)
            .then( function(elements){
                self.layers[type].elements = elements
            })
    }
    // Creates a map marker for all elements of type:type and attaches proper Listeners
    drawMapElements(type){
        var self = this
        this.layers[type].elements.forEach(function(element){
            if(type == "paths"){
                element.polyline = self.map.addPolyline({
                    coordinates: element.coordinates,
                    color: element.color,
                    content: self.htmlBuilder.mapElementMinorInfo(element,type)
                })
            }
            else{
                element.marker = self.map.addMarker({
                    id: element.id,
                    type: type,
                    coordinates: element.coordinates,
                    iconImage: element.iconImage,
                    minorContent: self.htmlBuilder.mapElementMinorInfo(element,type),
                    majorContent: self.htmlBuilder.mapElementMajorInfo(element,type)
                })
            }
        });    
    }
    // Show the element on the main Window of the app
    showMapElement(id,type){
        var self = this
        var element

        this.backendConnector.getMapElement(id,type)
        .then(function(result){
            element = result
        }).then( function(){
            var container = self.getMainWindowContainer()
            container.innerHTML = self.htmlBuilder.mapElementShow(element,type)
            self.showMainWindow()
        })
    }

    hideObjects(type){
        this.layers[type].elements.forEach(function(item){
            if(type=="paths"){
                item.polyline.setVisible(false)    
            }
            else{
                item.marker.setVisible(false)
            }
        })
        this.layers[type].visible = false
    }
    showObjects(type){
        this.layers[type].elements.forEach(function(item){
            if(type=="paths"){
                item.polyline.setVisible(true)    
            }
            else{
                item.marker.setVisible(true)
            }
        })
        this.layers[type].visible = true
    }
    showMainWindow(){
        console.log("mainWindow to front")
        document.querySelector("#main-window").style.zIndex = 40
    }
    hideMainWindow(){
        console.log("mainWindow to back")
        document.querySelector("#main-window").style.zIndex = 5
    }
    getMainWindowContainer(){
        return document.querySelector(".main-container")
    }
    isMainWindowVisible(){
        if(getMainWindow().zIndex==40){
            return true
        }
        else{
            return false
        }
    }
}