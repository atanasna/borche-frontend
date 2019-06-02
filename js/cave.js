function Cave(id, name,coordinates,iconImageLocation,depth,lenght,description){
    this.id = id
    this.name = name
    this.visible = true
    this.coordinates = coordinates
    this.iconImage = iconImageLocation
    this.content = "<h3>" + name + "</h3><br>depth: " + depth + "<br>lenght: " + lenght + "<br>" + description
}