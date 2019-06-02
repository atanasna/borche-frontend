function Cave(id, name,coordinates,iconImageLocation,depth,lenght,description){
    this.id = id
    this.name = name
    this.marker
    this.depth = depth
    this.lenght = lenght
    this.coordinates = coordinates
    this.iconImage = iconImageLocation
    this.content = "<h3>" + this.name + "</h3>"+
        "<br>depth: " + this.depth + 
        "<br>lenght: " + this.lenght + 
        "<br>" + description
}