class MapsHandler{
  constructor(){
    this.map = new google.maps.Map(document.getElementById('map'), {
        zoom:12,
        center: {lat: 42.723943, lng: 24.985956},
        //center: {lat: 37.772, lng: -122.214},
        mapTypeId: 'roadmap',
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
    });
  }

  addMarker(properties){
    var marker = new google.maps.Marker({
      position: properties.coordinates,
      map: this.map
    });

    //Major contains A lot of info and only apears on mouse click
    marker.majorInfoWindow = new google.maps.InfoWindow({
        content: properties.majorContent
      });

    //Minor contains less info and only apears on mouse over
    marker.minorInfoWindow = new google.maps.InfoWindow({
        content: properties.minorContent
      });
    if(properties.iconImage){
      marker.setIcon(properties.iconImage)
    }

    //EVENTS
      // On CLICK infobox
        if(properties.majorContent){
          marker.addListener('click', function(){
            if(marker.majorInfoWindow.map == null){
              marker.majorInfoWindow.open(this.map,marker)
              var more_button = properties.majorContent.querySelector(".more-button")
              more_button.addEventListener('click', function(){
                app.presentElementInMainWindow(properties.id,properties.type)
              });
              
              marker.minorInfoWindow.close()
            }
            else{
              marker.majorInfoWindow.close();
            }
          });
        }

      // On HOVER infobox
        if(properties.minorContent){
          marker.addListener('mouseover', function() {
            if(marker.majorInfoWindow.map == null){
              marker.minorInfoWindow.open(this.map,marker)
            }
          });
          marker.addListener('mouseout', function() {
            marker.minorInfoWindow.close()
          });
        }
    return marker
  }
  
  addPolyline(properties){
    var polyline = new google.maps.Polyline({
      path: properties.coordinates,
      geodesic: true,
      strokeColor: properties.color,
      strokeOpacity: 1.0,
      strokeWeight: 4
    });

    polyline.setMap(this.map)

    polyline.majorInfoWindow = new google.maps.InfoWindow({
      content: properties.content,
    });
    polyline.minorInfoWindow = new google.maps.InfoWindow({
      content: properties.content,
    });

    if(properties.content){
      // On CLICK infobox
      google.maps.event.addListener(polyline, 'click', function(event) {
        polyline.majorInfoWindow.close()
        polyline.majorInfoWindow.setPosition(event.latLng);
        polyline.majorInfoWindow.open(this.map)
        polyline.minorInfoWindow.close()
      });

      // On HOVER infobox
      google.maps.event.addListener(polyline, 'mouseover', function(event){
        if(polyline.majorInfoWindow.map == null){
          polyline.minorInfoWindow.setPosition(event.latLng);
          polyline.minorInfoWindow.open(this.map)
        }
      });
      google.maps.event.addListener(polyline, 'mouseout', function(event) {
        polyline.minorInfoWindow.close()
      });
    }
    
    return polyline
  }
}