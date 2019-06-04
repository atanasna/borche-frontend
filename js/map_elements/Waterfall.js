class Waterfall extends BasicMapElement {
    constructor(id,name,coordinates,iconImageLocation,height,description){
        super(id,name,coordinates,iconImageLocation,description);
        this.marker = null
        this.height = height

    }

    majorInfoWindowContent(){
        var container = document.createElement('div');
        container.innerHTML = `
            <div class='info-box-container'>
                <div class='major-info-box-title'>${this.name}</div> 
                ${ this.height ?`
                    <div class='info-box-attribute-label'>hight: </div>
                    <div class='info-box-attribute-value'>${this.height}m</div>` : ``
                }
            </div>
            <div class='major-info-box-button'>
                <img class='more-button' src='resources/icons/nav/arrow-sqeezed32h.png'>
            </div>
        `
        return container
    }
}
//