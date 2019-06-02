function Waterfall(id,name,coordinates,iconImageLocation,height,description){
    this.id = id
    this.name = name
    this.visible = true
    this.coordinates = coordinates
    this.iconImage = iconImageLocation
    this.content = "<h3>" + name + "</h3><br>height: " + height + "<br>"+description
}