function Hut(id, name, coordinates, iconImageLocation, description){
    this.id = id
    this.name = name
    this.marker
    this.coordinates = coordinates
    this.iconImage = iconImageLocation
    this.content = "<h3>" + name + "</h3><br>" + description
}