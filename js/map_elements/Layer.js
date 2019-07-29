class Layer{
    constructor(name){
        this.name = name
        this.elements = []
        this.visible = true
    }

    setVisibility(value){
        var self = this
        this.elements.forEach(function(item){
            if(self.name=="path"){
                item.polyline.setVisible(value)    
            }
            else{
                item.marker.setVisible(value)
            }
        })
        this.visible = value
    }
}