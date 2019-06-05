class Application{
    constructor(){
        this.map = new MapsHandler()
        this.elements = {}
    }

    loadMapElements(url,type){
        var self = this
        //Create new array if there is none
        if(this.elements[type]==null){
            this.elements[type] = []
        }

        return fetch(url,{mode: 'cors'})
        .then( response => response.json() )
        .then( function(data){
            for (var i = 0; i<data.length; i++){
                if(type == "huts"){
                    var hut = new Hut(
                        data[i]['id'],
                        data[i]['name'],
                        {lat: data[i]['latitude'], lng: data[i]['longitude']},
                        hutIconImageLocation,
                        data[i]['altitude'],
                        data[i]['capacity'],
                        data[i]['description'])
                    self.elements[type].push(hut)
                }
                if(type == "campsites"){
                    var campsite = new Campsite(
                        data[i]['id'],
                        data[i]['name'],
                        {lat: data[i]['latitude'], lng: data[i]['longitude']},
                        campsiteIconImageLocation,
                        data[i]['description'])
                    self.elements[type].push(campsite)
                }
                if(type == "caves"){
                    var cave = new Cave(
                        data[i]['id'],
                        data[i]['name'],
                        {lat: data[i]['latitude'], lng: data[i]['longitude']},
                        caveIconImageLocation,
                        data[i]['depth'],
                        data[i]['lenght'],
                        data[i]['description'])
                    self.elements[type].push(cave)
                }
                if(type == "waterfalls"){
                    var wf = new Waterfall(
                        data[i]['id'],
                        data[i]['name'],
                        {lat: data[i]['latitude'], lng: data[i]['longitude']},
                        waterfallIconImageLocation,
                        data[i]['height'],
                        data[i]['description'])
                    self.elements[type].push(wf)
                }
                if(type == "paths"){
                    var coordinates = []
                    for (var j = 0; j<data[i]['latitudes'].length; j++){
                        coordinates.push({lat:data[i]['latitudes'][j], lng:data[i]['longitudes'][j]})
                    }

                    var path = new Path(
                        data[i]['id'],
                        data[i]['name'],
                        coordinates,
                        data[i]['color'],
                        data[i]['lenght'],
                        data[i]['time'],
                        data[i]['description']) 
                    self.elements[type].push(path)   
                }
            }
        })
    }
    drawMapElements(type){
        var self = this
        this.elements[type].forEach(function(element){
            if(type == "huts"){
                element.marker = self.map.addMarker({
                    id: element.id,
                    type: "huts",
                    coordinates: element.coordinates,
                    iconImage: element.iconImage,
                    minorContent: element.minorInfoWindowContent(),
                    majorContent: element.majorInfoWindowContent(),
                    blabla: "nasko"
                })
            }
            if(type == "campsites"){
                element.marker = self.map.addMarker({
                    id: element.id,
                    type:"campsites",
                    coordinates: element.coordinates,
                    iconImage: element.iconImage,
                    minorContent: element.minorInfoWindowContent(),
                    majorContent: element.majorInfoWindowContent()
                })
            }
            if(type == "caves"){
                element.marker = self.map.addMarker({
                    id: element.id,
                    type:"caves",
                    coordinates: element.coordinates,
                    iconImage: element.iconImage,
                    minorContent: element.minorInfoWindowContent(),
                    majorContent: element.majorInfoWindowContent()
                })
            }
            if(type == "waterfalls"){
                element.marker = self.map.addMarker({
                    id: element.id,
                    type:"waterfalls",
                    coordinates: element.coordinates,
                    iconImage: element.iconImage,
                    minorContent: element.minorInfoWindowContent(),
                    majorContent: element.majorInfoWindowContent()
                })
            }
            if(type == "paths"){
                element.polyline = self.map.addPolyline({
                    coordinates: element.coordinates,
                    color: element.color,
                    content: element.minorInfoWindowContent()
                })
            }
        });    
    }
    presentElementInMainWindow(id,type){
        var self = this
        var url = null
        if (type=="huts"){
            url = fetch_huts_url
        }
        if (type=="campsites"){
            url = fetch_campsites_url
        }
        if (type=="caves"){
            url = fetch_caves_url
        }
        if (type=="waterfalls"){
            url = fetch_waterfalls_url
        }
        url += `/${id}`

        console.log(url)
        fetch(url,{mode: 'cors'})
        .then( response => response.json() )
        .then( function(data){
            var mainWindow = self.getMainWindowContainer()
            mainWindow.innerHTML = `
              <div class="main-title">${data.general.name}</div>
              <hr>
              <div class="main-content">
                id:${data.general.id}<br>
                lat:${data.general.latitude},lng:${data.general.longitude}<br> 
                score:${data.score}<br>
              </div>
            `
            self.showMainWindow()
        })
    }
    toggleMapElements(type){

    }

    hideObjects(type){
      this.elements[type].forEach(function(item){
          if(type=="paths"){
              item.polyline.setVisible(false)    
          }
          else{
              item.marker.setVisible(false)
          }
      })
    }
    showObjects(type){
      this.elements[type].forEach(function(item){
          if(type=="paths"){
              item.polyline.setVisible(true)    
          }
          else{
              item.marker.setVisible(true)
          }
      })
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