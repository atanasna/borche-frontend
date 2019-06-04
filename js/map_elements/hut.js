function Hut(id, name, coordinates, iconImageLocation, altitude, capacity, description){
    this.id = id
    this.name = name
    this.altitude = altitude
    this.capacity = capacity
    this.marker
    this.coordinates = coordinates
    this.iconImage = iconImageLocation
    this.description = description
    this.generateMinorInfoWindowContent = function(){
        content = "<div class='info-box-container'>" 
        content += "<div class='minor-info-box-title'>" + this.name + "</div>"
        //if(this.altitude){
        //    content += "<div class='info-box-attribute-label'>altitude: </div>" 
        //    content += "<div class='info-box-attribute-value'>" + this.altitude +"m</div>"
        //}
        content += "</div>"

        return content
    }
    this.generateMajorInfoWindowContent = function(){
        content = "<div class='info-box-container'>" 
        content += `<div class='major-info-box-title'>${this.name}</div>`
        if(this.altitude){
            content += `<div class='info-box-attribute-label'>altitude: </div>` 
            content += `<div class='info-box-attribute-value'>${this.altitude}m</div>`
        }
        if(this.capacity){
            content += `<br>`
            content += `<div class='info-box-attribute-label'>capacity: </div>` 
            content += `<div class='info-box-attribute-value'>${this.capacity}</div>`
        }
        content += `</div>`
        content += `<div class='major-info-box-button'><img class=\"more-button\" src='resources/icons/nav/arrow-sqeezed32h.png'></div>`
        
        var div = document.createElement('div');
        div.innerHTML = content

        return div
    }
}