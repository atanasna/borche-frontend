function Waterfall(id,name,coordinates,iconImageLocation,height,description){
    this.id = id
    this.name = name
    this.marker
    this.height = height
    this.coordinates = coordinates
    this.iconImage = iconImageLocation
    this.content = "<h3>" + this.name + "</h3>" + 
        "<br>height: " + this.height + 
        "<br>" + description
}