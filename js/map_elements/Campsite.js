class Campsite extends BasicMapElement {
    constructor(id,name,coordinates,approved=false,description=null,images=null){
        super(id,name,coordinates,approved,description,images);
        this.marker = null
        if(approved){
            this.iconImage = app.resourcer.icons.campsite.color32
            //this.iconImage = campsiteIconUrl    
        }
        else{
            this.iconImage = app.resourcer.icons.campsite.gray32
            //this.iconImage = campsiteGrayIconUrl 
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