function Campsite(id, name,coordinates,iconImageLocation,description){
    this.id = id
    this.name = name
    this.marker
    this.coordinates = coordinates
    this.iconImage = iconImageLocation
    this.description = description

    this.minorInfoWindowContent = "<div class='info-box-container'>" 
    this.minorInfoWindowContent += "<div class='minor-info-box-title'>" + this.name + "</div>"
    this.minorInfoWindowContent += "</div>"

    this.majorInfoWindowContent = "<div class='info-box-container'>" 
    this.majorInfoWindowContent += "<div class='major-info-box-title'>" + this.name + "</div>"
    if(this.description){
        this.majorInfoWindowContent += "<div class='major-info-box-description' >" + this.description + "</div>"
    }
    this.majorInfoWindowContent += "</div>"
}