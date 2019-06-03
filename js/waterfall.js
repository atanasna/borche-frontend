function Waterfall(id,name,coordinates,iconImageLocation,height,description){
    this.id = id
    this.name = name
    this.marker
    this.height = height
    this.coordinates = coordinates
    this.iconImage = iconImageLocation
    this.description = description
    this.content = "<h3>" + this.name + "</h3>"
    if(this.height){
        this.content += "<br>height: <b>" + this.height +"m</b>"
    }
    if(this.description){
        this.content += "<br>" + this.description
    }
}