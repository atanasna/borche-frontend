class Hut extends BasicMapElement {
    constructor(id, name, coordinates, approved=false, altitude=null, capacity=null, description=null, images = null){
        super(id,name,coordinates,approved,description,images);
        this.marker = null
        if(approved){
            this.iconImage = app.resourcer.icons.hut.color32
            //this.iconImage = hutIconUrl    
        }
        else{
            this.iconImage = app.resourcer.icons.hut.gray32
            //this.iconImage = hutGrayIconUrl 
        }
        this.altitude = isNaN(altitude) ? null:altitude
        this.capacity = isNaN(capacity) ? null:capacity
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
    toFormData(){
        let formData = super.toFormData()
        this.altitude != null && !isNaN(this.altitude) ? formData.set('altitude', this.altitude) : null
        this.capacity != null && !isNaN(this.capacity) ? formData.set('capacity', this.capacity) : null
        return formData
    }
}