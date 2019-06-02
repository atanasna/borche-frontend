function Hut(id, name, coordinates, iconImageLocation, altitude, capacity, description){
    this.id = id
    this.name = name
    this.altitude = altitude
    this.capacity = capacity
    this.marker
    this.coordinates = coordinates
    this.iconImage = iconImageLocation
    this.content = "<h3>" + this.name + "</h3>" + 
        "<br>altitude: " + this.altitude + 
        "<br>capacity: " + this.capacity + 
        "<br>" + description
}