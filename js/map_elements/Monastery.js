class Monastery extends BasicMapElement {
    constructor(id, name, coordinates, approved, description){
        super(id,name,coordinates,approved,description);
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