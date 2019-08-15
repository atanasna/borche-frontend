class Layer{
    constructor(name){
        this.name = name
        this.elements = []
        this.visible = true
    }

    setVisibility(value){
        var self = this
        this.elements.forEach(function(item){
            if(self.name=="path"){
                item.polyline.setVisible(value)    
            }
            else{
                item.marker.setVisible(value)
                if(value){
                    self.markerCluster.addMarkers([item.marker])
                }
            }
        })
        if(value==false){
            this.markerCluster.clearMarkers();
        }

        this.visible = value
    }

    createMarkerCluster(){
        let markers = []
        this.elements.forEach(function(element){
            markers.push(element.marker)
        })
        console.log(markers)
        let mcOptions = {
            maxZoom: 10,
            zoomOnClick: false,
            styles: [{
                height: 110,
                url: `resources/icons/set2/${this.name + "_cluster.png"}`,
                width: 54
            }]
        }
        
        this.markerCluster = new MarkerClusterer(app.map.map, markers,mcOptions) 
        //this.markerCluster = new MarkerClusterer(app.map.map, markers,
        //    {imagePath: `resources/markerclusterer/${this.name + "1"}`,
        //    maxZoom: 10,
        //    imageSizes: [120,130,140,150,160,170]})
    }

    
}