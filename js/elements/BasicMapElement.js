class BasicMapElement{
    constructor(id,name,coordinates,approved=false,description=null,images=null,score=null,reviews=null){
        this.id = isNaN(id) ? null:id
        this.name = name
        this.coordinates = coordinates
        this.approved = approved
        this.description = description
        this.images = images
        this.score = score
        this.reviews = reviews
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
            approved : this.approved,
            description : this.description,
            images: this.images
        }
    }

    toFormData(){
        let formData = new FormData();
        this.name != null ? formData.set('name', this.name) : null
        this.name != null ? formData.set('latitude', this.coordinates.lat) : null
        this.name != null ? formData.set('longitude', this.coordinates.lng) : null
        this.name != null ? formData.set('description', this.description) : null
        for (let i = 0; i < this.images.length; i++) {
            formData.append('images[]', this.images[i])
        }
        return formData
    }

    static icon(type){
        let classname = this.toString().split ('(' || /s+/)[0].split (' ' || /s+/)[1];
        
        switch(type){
            case "active":
                return new google.maps.MarkerImage(app.resourcer.icons[classname.toLowerCase()].color32,
                    new google.maps.Size(32, 32),
                    new google.maps.Point(0, 0),
                    new google.maps.Point(16, 16));
                break
            case "active_hover":
                return new google.maps.MarkerImage(app.resourcer.icons[classname.toLowerCase()].circled,
                    new google.maps.Size(48, 48),
                    new google.maps.Point(0, 0),
                    new google.maps.Point(24, 24));
                break
            case "active_click":
                return new google.maps.MarkerImage(app.resourcer.icons[classname.toLowerCase()].circled,
                    new google.maps.Size(48, 48),
                    new google.maps.Point(0, 0),
                    new google.maps.Point(24, 24));
                break
            case "pending":
                return new google.maps.MarkerImage(app.resourcer.icons[classname.toLowerCase()].gray32,
                    new google.maps.Size(32, 32),
                    new google.maps.Point(0, 0),
                    new google.maps.Point(16, 16));
                break
            case "pending_hover":
                return new google.maps.MarkerImage(app.resourcer.icons[classname.toLowerCase()].gray48_circled,
                    new google.maps.Size(48, 48),
                    new google.maps.Point(0, 0),
                    new google.maps.Point(24, 24));
                break
            case "pending_click":
                return new google.maps.MarkerImage(app.resourcer.icons[classname.toLowerCase()].gray48_circled,
                    new google.maps.Size(48, 48),
                    new google.maps.Point(0, 0),
                    new google.maps.Point(24, 24));
        }
    }
}