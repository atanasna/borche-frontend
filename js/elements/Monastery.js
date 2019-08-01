class Monastery extends BasicMapElement {
    constructor(id, name, coordinates, approved=false, description=null,images=null){
        super(id,name,coordinates,approved,description,images);
        this.marker = null
        if(approved){
            this.iconImage = monasteryIconUrl    
        }
        else{
            this.iconImage = monasteryGrayIconUrl 
        }
    }
    isValid(){
        return super.isValid()
    }
}