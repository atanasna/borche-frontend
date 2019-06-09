class Cave extends BasicMapElement {
    constructor(id,name,coordinates,approved,depth,lenght,description){
        super(id,name,coordinates,approved,description);
        this.marker = null
        this.depth = depth
        this.lenght = lenght
        if(approved){
            this.iconImage = caveIconUrl    
        }
        else{
            this.iconImage = caveGrayIconUrl 
        }
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
}
//