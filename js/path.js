function Path(id, name, coordinates, color, lenght, time){
    this.id = id
    this.name = name
    this.time = time
    this.lenght = lenght
    this.coordinates = coordinates
    this.polyline
    this.color = color
    this.content = "time: " + Math.floor(this.time/60) + "h" + time%60 +"m"
        
    if(this.lenght){
        this.content += "<br>lenght: " + this.lenght + "km"
    }

}