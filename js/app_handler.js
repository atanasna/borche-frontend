var hutIconImageLocation = "resources/icons/hut32.png"
var campsiteIconImageLocation = "resources/icons/campsite32.png"
var caveIconImageLocation = "resources/icons/cave32.png"
var waterfallIconImageLocation = "resources/icons/waterfall32.png"

function AppHandler(){
    // using a new variable called self because this looses context from 
    // time to time and no longer refers to the AppHandler object
    var self = this 
    this.map = new GoogleMapsHandler()
    self.objects = {
        huts: [],
        campsites: [],
        caves: [],
        waterfalls: [],
        paths:[],
        areas: []}

    this.loadObjects = function(url,type){
        switch(type){
            case "huts":
                fetch(url,{mode: 'cors'})
                .then( response => response.json() )
                .then( function(data){
                    for (i = 0; i<data.length; i++){
                        hut = new Hut(
                            data[i]['id'],
                            data[i]['name'],
                            {lat: data[i]['latitude'], lng: data[i]['longitude']},
                            hutIconImageLocation,
                            data[i]['altitude'],
                            data[i]['capacity'],
                            data[i]['description'])
                        
                        hut.marker = self.map.addMarker({
                            coordinates: hut.coordinates,
                            iconImage: hut.iconImage,
                            content: hut.content
                        })

                        self.objects[type].push(hut)
                    }
                })
                break
            case "campsites":
                fetch(url,{mode: 'cors'})
                .then( response => response.json() )
                .then( function(data){
                    for (i = 0; i<data.length; i++){
                        campsite = new Campsite(
                            data[i]['id'],
                            data[i]['name'],
                            {lat: data[i]['latitude'], lng: data[i]['longitude']},
                            campsiteIconImageLocation,
                            data[i]['description'],)
                        
                        campsite.marker = self.map.addMarker({
                            coordinates: campsite.coordinates,
                            iconImage: campsite.iconImage,
                            content: campsite.content
                        })

                        self.objects[type].push(campsite)
                    }
                })
                break
            case "caves":
                fetch(url,{mode: 'cors'})
                .then( response => response.json() )
                .then( function(data){
                    for (i = 0; i<data.length; i++){
                        cave = new Cave(
                            data[i]['id'],
                            data[i]['name'],
                            {lat: data[i]['latitude'], lng: data[i]['longitude']},
                            caveIconImageLocation,
                            data[i]['depth'],
                            data[i]['lenght'],
                            data[i]['description'])
                        cave.marker = self.map.addMarker({
                            coordinates: cave.coordinates,
                            iconImage: cave.iconImage,
                            content: cave.content
                        })

                        self.objects[type].push(cave)
                    }
                })
                break
            case "waterfalls":
                fetch(url,{mode: 'cors'})
                .then( response => response.json() )
                .then( function(data){
                    for (i = 0; i<data.length; i++){
                        wf = new Waterfall(
                            data[i]['id'],
                            data[i]['name'],
                            {lat: data[i]['latitude'], lng: data[i]['longitude']},
                            waterfallIconImageLocation,
                            data[i]['height'],
                            data[i]['description'])
                        wf.marker = self.map.addMarker({
                            coordinates: wf.coordinates,
                            iconImage: wf.iconImage,
                            content: wf.content
                        })

                        self.objects[type].push(wf)
                    }
                })
                break
            case "paths":
                fetch(url,{mode: 'cors'})
                .then( response => response.json() )
                .then( function(data){
                    for (i = 0; i<data.length; i++){
                        var coordinates = []
                        for (j = 0; j<data[i]['latitudes'].length; j++){
                          coordinates.push({lat:data[i]['latitudes'][j], lng:data[i]['longitudes'][j]})
                        }

                        path = new Path(
                            data[i]['id'],
                            data[i]['name'],
                            coordinates,
                            data[i]['color'],
                            data[i]['lenght'],
                            data[i]['time'],
                            data[i]['description'])

                        path.polyline = self.map.addPolyline({
                            coordinates: path.coordinates,
                            color: path.color,
                            content: path.content
                        })

                        self.objects[type].push(path)
                    }
                })
            case "areas":
                break
            default:
                break
        }
    }

    // Change Markers visibility
    this.hideObjects = function(type){
        console.log(this)
        this.objects[type].forEach(function(item){
            if(type=="paths"){
                item.polyline.setVisible(false)    
            }
            else{
                item.marker.setVisible(false)
            }
        })
    }
    this.showObjects = function(type){
        this.objects[type].forEach(function(item){
            if(type=="paths"){
                item.polyline.setVisible(true)    
            }
            else{
                item.marker.setVisible(true)
            }
        })
    }
}