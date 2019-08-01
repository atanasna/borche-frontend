class Waterfall extends BasicMapElement {
    constructor(id,name,coordinates,approved=false,height=null,description=null,images=null,score=null,reviews=null){
        super(id,name,coordinates,approved,description,images,score,reviews);
        this.marker = null
        this.height = height
        if(approved){
            this.iconImage = app.resourcer.icons.waterfall.color32
            //this.iconImage = waterfallIconUrl
        }
        else{
            this.iconImage = app.resourcer.icons.waterfall.gray32
            //this.iconImage = waterfallGrayIconUrl
        }
    }

    isValid(){
        var result = super.isValid()
        if (this.height != null){
            if(this.height <= 0 || typeof(this.height)!="number" )
                {
                result.code = false
                result.errors.push("Height must be positive number")
            }
        }
        return result  
    }

    toJson(){
        let json = super.toJson()
        json.height = this.height
        return json
    }

    static fromJson(data){
        let wf = new Waterfall(
            data['id'],
            data['name'],
            {lat: data['latitude'], lng: data['longitude']},
            data['approved'],
            data['height'],
            data['description'],
            data['images'],
            data['score'],
            data['reviews'],) 
        return wf
    }

    toFormData(){
        let formData = super.toFormData()
        this.height != null && !isNaN(this.height) ? formData.set('height', this.height) : null
        return formData
    }
}
//