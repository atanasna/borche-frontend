function Hut(id, name, coordinates, iconImageLocation, altitude, capacity, description){
    this.id = id
    this.name = name
    this.altitude = altitude
    this.capacity = capacity
    this.marker
    this.coordinates = coordinates
    this.iconImage = iconImageLocation
    this.description = description
    this.content = "<h3>" + this.name + "</h3>"

    if(this.altitude){
        this.content += "<br>altitude: <b>" + this.altitude +"m</b>"
    }
    if(this.capacity){
        this.content += "<br>capacity: <b>" + this.capacity + "</b>"
    }
    if(this.description){
        this.content += "<br>" + description
    }
}