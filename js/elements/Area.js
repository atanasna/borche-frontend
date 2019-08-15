class Area{
    constructor(id, name, coordinates,description){
        this.id = id
        this.name = name
        this.coordinates = coordinates
        this.description = description
        this.poligon = null
    }

    static fromJson(data){
        var coordinates = []
        for (var j = 0; j<data['latitudes'].length; j++){
            coordinates.push({lat:data['latitudes'][j], lng:data['longitudes'][j]})
        }

        var area = new Area(
            data['id'],
            data['name'],
            coordinates,
            data['description']) 
        return area
    }
}