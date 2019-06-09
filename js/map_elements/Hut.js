class Hut extends BasicMapElement {
    constructor(id, name, coordinates, approved, altitude, capacity, description){
        super(id,name,coordinates,approved,description);
        this.marker = null
        if(approved){
            this.iconImage = hutIconUrl    
        }
        else{
            this.iconImage = hutGrayIconUrl 
        }
        this.altitude = altitude
        this.capacity = capacity
    }

    isValid(){
        var result = super.isValid()
        if (this.altitude != null){
            if(this.altitude <= 0 || typeof(this.altitude)!="number" )
                {
                result.code = false
                result.errors.push("Altitude must be positive number")
            }
        }
        if (this.capacity != null){
            if(this.capacity <= 0 || typeof(this.capacity)!="number" )
                {
                result.code = false
                result.errors.push("Capacity must be positive number")
            }
        }
        return result  
    }

    toJson(){
        let json = super.toJson()
        json.altitude = this.altitude
        json.capacity = this.capacity
        return json
    }
}