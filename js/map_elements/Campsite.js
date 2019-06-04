class Campsite extends BasicMapElement {
    constructor(id,name,coordinates,iconImageLocation,description){
        super(id,name,coordinates,iconImageLocation,description);
        this.marker = null
    }

    majorInfoWindowContent(){
        var container = document.createElement('div');
        container.innerHTML = `
            <div class='info-box-container'>
                <div class='major-info-box-title'>${this.name}</div> 
            </div>
            <div class='major-info-box-button'>
                <img class='more-button' src='resources/icons/nav/arrow-sqeezed32h.png'>
            </div>
        `
        return container
    }
}
//