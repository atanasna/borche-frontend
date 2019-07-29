class Waterfall extends BasicMapElement {
    constructor(id,name,coordinates,approved=false,height=null,description=null,images=null){
        super(id,name,coordinates,approved,description,images);
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
}
//