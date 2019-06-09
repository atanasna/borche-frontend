class Waterfall extends BasicMapElement {
    constructor(id,name,coordinates,approved,height,description){
        super(id,name,coordinates,approved,description);
        this.marker = null
        this.height = height
        if(approved){
            this.iconImage = waterfallIconUrl    
        }
        else{
            this.iconImage = waterfallGrayIconUrl 
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