function GoogleMapHandler(){
    this.map = new google.maps.Map(document.getElementById('map'), {
        zoom:12,
        center: {lat: 42.723943, lng: 24.985956},
        //center: {lat: 37.772, lng: -122.214},
        mapTypeId: 'roadmap'
    });

    this.addMarker = function addMarker(properties){
        var marker = new google.maps.Marker({
          position: properties.coordinates,
          map: this.map
        });

        if(properties.iconImage){
          marker.setIcon(properties.iconImage)
        }
        if(properties.content){
          var infoWindow = new google.maps.InfoWindow({
            content: properties.content
          });

          marker.addListener('click', function(){
            infoWindow.open(this.map,marker);
          });
        }

        return marker
    }

    this.addPolyline = function addPolyline(properties){
        var polyline = new google.maps.Polyline({
          path: properties.coordinates,
          geodesic: true,
          strokeColor: properties.color,
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        polyline.setMap(this.map);

        return polyline
    }
}