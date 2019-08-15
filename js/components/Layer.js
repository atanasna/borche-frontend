class Layer{
    constructor(name, iconImage, iconHoverImage, iconClickImage){
        this.name = name
        this.elements = []
        this.visible = true
        this.icon = new google.maps.MarkerImage(iconImage,
                new google.maps.Size(32, 32),
                new google.maps.Point(0, 0),
                new google.maps.Point(16, 16));
        this.hoverIcon = new google.maps.MarkerImage(iconHoverImage,
                new google.maps.Size(48, 48),
                new google.maps.Point(0, 0),
                new google.maps.Point(24, 24));
        this.clickIcon = new google.maps.MarkerImage(iconClickImage,
                new google.maps.Size(48, 48),
                new google.maps.Point(0, 0),
                new google.maps.Point(24, 24));
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
        this.markerCluster = new MarkerClusterer(app.map.map, markers,
            {imagePath: `resources/markerclusterer/${this.name}`,
            maxZoom: 10})
    }
}