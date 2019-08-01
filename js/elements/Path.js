class Path{
    constructor(id, name, coordinates, color, lenght, time){
        this.id = id
        this.name = name
        this.time = time
        this.lenght = lenght
        this.coordinates = coordinates
        this.color = color
        this.polyline = null
    }

    static fromJson(data){
        var coordinates = []
        for (var j = 0; j<data['latitudes'].length; j++){
            coordinates.push({lat:data['latitudes'][j], lng:data['longitudes'][j]})
        }

        var path = new Path(
            data['id'],
            data['name'],
            coordinates,
            data['color'],
            data['lenght'],
            data['time'],
            data['description']) 
        return path
    }
}