class Cave extends BasicMapElement {
    constructor(id,name,coordinates,approved=false,depth=null,lenght=null,description=null,images=null,score=null,reviews=null){
        super(id,name,coordinates,approved,description,images,score,reviews);
        this.marker = null
        this.depth = depth
        this.lenght = lenght
    }

    isValid(){
        var result = super.isValid()
        if (this.depth != null){
            if(this.depth <= 0 || typeof(this.depth)!="number" )
                {
                result.code = false
                result.errors.push("Depth must be positive number")
            }
        }
        if (this.lenght != null){
            if(this.lenght <= 0 || typeof(this.lenght)!="number" )
                {
                result.code = false
                result.errors.push("Lenght must be positive number")
            }
        }
        return result  
    }

    toJson(){
        let json = super.toJson()
        json.depth = this.depth
        json.length = this.length
        return json
    }

    static fromJson(data){
        let cave = new Cave(
            data['id'],
            data['name'],
            {lat: data['latitude'], lng: data['longitude']},
            data['approved'],
            data['depth'],
            data['length'],
            data['description'],
            data['images'],
            data['score'],
            data['reviews'],) 
        return cave
    }

    toFormData(){
        let formData = super.toFormData()
        this.depth != null && !isNaN(this.depth) ? formData.set('depth', this.depth) : null
        this.length != null && !isNaN(this.length) ? formData.set('length', this.length) : null
        return formData
    }
}
//