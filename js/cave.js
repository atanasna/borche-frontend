function Cave(id, name,coordinates,iconImageLocation,depth,lenght,description){
    this.id = id
    this.name = name
    this.marker
    this.depth = depth
    this.lenght = lenght
    this.coordinates = coordinates
    this.iconImage = iconImageLocation
    this.description = this.description
    this.content = "<h3>" + this.name + "</h3>"
    if(this.depth){
        this.content += "<br>depth: <b>" + this.depth +"m</b>"
    }
    if(this.lenght){
        this.content += "<br>lenght: <b>" + this.lenght + "</b>"
    }
    if(this.description){
        this.content += "<br>" + this.description
    }
}