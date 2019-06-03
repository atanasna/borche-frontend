function Campsite(id, name,coordinates,iconImageLocation,description){
    this.id = id
    this.name = name
    this.marker
    this.coordinates = coordinates
    this.iconImage = iconImageLocation
    this.description = description
    this.content = "<h3>" + this.name + "</h3>"
    if(this.description){
        this.content += "<br>" + description
    }
}