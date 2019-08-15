class Path{
    constructor(id, name, coordinates, color, distance, time, description){
        this.id = id
        this.name = name
        this.time = time
        this.distance = distance
        this.coordinates = coordinates
        this.color = color
        this.description = description
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
            data['distance'],
            data['time'],
            data['description']) 
        return path
    }
}