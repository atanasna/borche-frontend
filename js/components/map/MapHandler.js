class MapHandler{
    constructor(){
      this.map = new google.maps.Map(document.getElementById('map'), {
          zoom:12,
          center: {lat: 42.777823, lng: 24.534963},
          //center: {lat: 37.772, lng: -122.214},
          mapTypeId: 'roadmap',
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: false
      });
      this.geocoder = new google.maps.Geocoder
      this.autocomplete = new google.maps.places.AutocompleteService()
      this.attachMapRightClickListner()
      this.attachMapLeftClickListner()

      //this.poligon = this.addPoligon(null)
    }

    addMarker(properties){
      var marker = new google.maps.Marker({
        position: properties.coordinates,
        clicked: false,
        map: this.map,
      });

      //Major contains A lot of info and only apears on mouse click
      marker.majorInfoWindow = new google.maps.InfoWindow({
          content: properties.majorContent
        });

      //Minor contains less info and only apears on mouse over
      marker.minorInfoWindow = new google.maps.InfoWindow({
          content: properties.minorContent
        });
      if(properties.icon){
        marker.setIcon(properties.icon)
      }

      //EVENTS
        marker.addListener('click', function(){
          console.log(properties)
          if (marker.clicked){
            console.log("unclick")
            marker.setIcon(properties.icon)
            marker.clicked = false
          }
          else{
            console.log("click")
            marker.setIcon(properties.clickIcon)
            marker.clicked = true
          }
          if(properties.majorContent){
              if(marker.majorInfoWindow.map == null){
                marker.majorInfoWindow.open(this.map,marker)
                var more_button = properties.majorContent.querySelector(".more-button")
                more_button.addEventListener('click', function(){
                  app.showMapElement(properties.id,properties.type)
                });
                marker.minorInfoWindow.close()
              }
              else{
                marker.majorInfoWindow.close();
                //
              }
          }
        });

        // On HOVER infobox
          marker.addListener('mouseover', function() {
            if(marker.majorInfoWindow.map == null){
              marker.minorInfoWindow.open(this.map,marker)
            }
            if (marker.clicked==false){
              marker.setIcon(properties.hoverIcon)
            }
          });
          marker.addListener('mouseout', function() {
            marker.minorInfoWindow.close()
            if (marker.clicked==false){
              marker.setIcon(properties.icon)
            }
          });
      return marker
    }
  
    addPolyline(properties){
      var lineSymbol = {
          path: 'M 0,-1 0,1',
          strokeColor: properties.color,
          
          strokeOpacity: 0.5,
          scale: 3
        };

      var polyline = new google.maps.Polyline({
        path: properties.coordinates,
        geodesic: true,
        strokeColor: properties.color,
        strokeOpacity: 0,
        strokeWeight: 5,
        icons: [{
            icon: lineSymbol,
            offset: '0',
            repeat: '15px'
          }]
      });

      polyline.setMap(this.map)

      polyline.majorInfoWindow = new google.maps.InfoWindow({
        content: properties.content,
      });
      polyline.minorInfoWindow = new google.maps.InfoWindow({
        content: properties.content,
      });

      //EVENTS
      
        // On CLICK infobox
          //google.maps.event.addListener(polyline, 'click', function(event) {
          //  if(properties.content){
          //    polyline.majorInfoWindow.close()
          //    polyline.majorInfoWindow.setPosition(event.latLng);
          //    polyline.majorInfoWindow.open(this.map)
          //    polyline.minorInfoWindow.close()
          //  }
          //});

        // On HOVER infobox
          google.maps.event.addListener(polyline, 'mouseover', function(event){
            if(properties.content){
              if(polyline.majorInfoWindow.map == null){
                polyline.minorInfoWindow.setPosition(event.latLng);
                polyline.minorInfoWindow.open(this.map)

                polyline.setOptions({
                  strokeColor: "#ffffff",
                  strokeWeight: 20,
                  strokeOpacity: 0.8
                });
              }
            }
          });

          google.maps.event.addListener(polyline, 'mouseout', function(event) {
            if(properties.content){
              polyline.minorInfoWindow.close()
              polyline.setOptions({
                  strokeColor: properties.color,
                  strokeWeight: 5,
                  strokeOpacity: 0
                });  
            }
          });
      
      return polyline
    }

    addPoligon(properties){
      var border = properties.coordinates

      // Construct the polygon.
      var polygon = new google.maps.Polygon({
        paths: border,
        strokeColor: properties.border_color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: properties.fill_color,
        fillOpacity: 0.35
      });

      polygon.setMap(this.map);
      //EVENTS
      
        // On CLICK infobox
          //google.maps.event.addListener(polyline, 'click', function(event) {
          //  if(properties.content){
          //    polyline.majorInfoWindow.close()
          //    polyline.majorInfoWindow.setPosition(event.latLng);
          //    polyline.majorInfoWindow.open(this.map)
          //    polyline.minorInfoWindow.close()
          //  }
          //});

        // On HOVER infobox
          google.maps.event.addListener(polygon, 'mouseover', function(event){
            polygon.setOptions({
              strokeColor: "#abc123",
              fillColor: '#123abc'
            });
          });

          google.maps.event.addListener(polygon, 'mouseout', function(event) {
              polygon.setOptions({
                  strokeColor: properties.border_color,
                  fillColor: properties.fill_color
              });
          });

    }

    center(lat,lng){
        this.map.setCenter(new google.maps.LatLng(lat, lng));
    }

    zoom(level){
        this.map.setZoom(level);
    }
    fitBounds(bounds){
        this.map.fitBounds(bounds);
    }
    
    // EVENTS
    attachMapRightClickListner(){
        google.maps.event.addListener(this.map, "rightclick", function(event) {
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();
            // populate yor box/field with lat, lng
            alert("Lat=" + lat + "; Lng=" + lng);
        });
    }
    attachMapLeftClickListner(){
        var c = document.getElementById('map');
        google.maps.event.addDomListener(c, "mousedown", function (e) {
            if (e.which === 1) {
                app.tools[0].predictionBox.style.display="none"
            } 
        });
    }
}

