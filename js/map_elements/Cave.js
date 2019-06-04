class Cave extends BasicMapElement {
    constructor(id,name,coordinates,iconImageLocation,depth,lenght,description){
        super(id,name,coordinates,iconImageLocation,description);
        this.marker = null
        this.depth = depth
        this.lenght = lenght
    }

    majorInfoWindowContent(){
        var container = document.createElement('div');
        container.innerHTML = `
            <div class='info-box-container'>
                <div class='major-info-box-title'>${this.name}</div> 
                ${ this.depth ?`
                    <div class='info-box-attribute-label'>depth: </div>
                    <div class='info-box-attribute-value'>${this.depth}m</div>` : ``
                }
                ${ this.lenght ?`
                    <br>
                    <div class='info-box-attribute-label'>lenght: </div>
                    <div class='info-box-attribute-value'>${this.lenght}m</div>` : ``
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