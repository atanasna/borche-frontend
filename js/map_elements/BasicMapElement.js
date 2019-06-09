class BasicMapElement{
    constructor(id,name,coordinates,approved,description){
        this.id = id
        this.name = name
        this.coordinates = coordinates
        this.approved = approved
        this.iconImage = null
        this.description = description
    }

    isValid(){
        var result = { code: true, errors:[] }
        if ( typeof(this.coordinates.lat) == "number" && !isNaN(this.coordinates.lat)){
            if (this.coordinates.lat>90 || this.coordinates.lat<-90){
                result.code = false
                result.errors.push("Latitude must be a number between -90 and 90")
            }
        }
        else{
            result.code = false
            result.errors.push("Latitude must be a number between -90 and 90")
        }
        
        if ( typeof(this.coordinates.lng) == "number" && !isNaN(this.coordinates.lng)){
            if (this.coordinates.lng>180 || this.coordinates.lng<-180){
                result.code = false
                result.errors.push("Longitude must be a number between -180 and 180")
            }
        }
        else{
            result.code = false
            result.errors.push("Longitude must be a number between -180 and 180")
        }
        if (this.name == null || 
            this.name =="" || 
            typeof(this.name)!="string")
            {
            result.code = false
            result.errors.push("Name must be a nonempty string")
        }
        return result
    }

    toJson(){
        return {
            name : this.name,
            latitude : this.coordinates.lat,
            longitude : this.coordinates.lng,
            description : this.description
        }
    }
}