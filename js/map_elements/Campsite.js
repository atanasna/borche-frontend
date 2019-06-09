class Campsite extends BasicMapElement {
    constructor(id,name,coordinates,approved,description){
        super(id,name,coordinates,approved,description);
        this.marker = null
        if(approved){
            this.iconImage = campsiteIconUrl    
        }
        else{
            this.iconImage = campsiteGrayIconUrl 
        }
    }

    isValid(){
        return super.isValid()
    }
    toJson(){
        return super.toJson()
    }
}
//