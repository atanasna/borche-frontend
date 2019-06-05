class Hut extends BasicMapElement {
    constructor(id, name, coordinates, iconImageLocation, altitude, capacity, description){
        super(id,name,coordinates,iconImageLocation,description);
        this.marker = null
        this.altitude = altitude
        this.capacity = capacity

    }

    majorInfoWindowContent(){
        var container = document.createElement('div');
        container.innerHTML = `
            <div class='info-box-container'>
                <div class='major-info-box-title'>${this.name}</div> 
                ${ this.altitude ?`
                    <div class='info-box-attribute-label'>altitude: </div>
                    <div class='info-box-attribute-value'>${this.altitude}m</div>` : ``
                }
                ${ this.capacity ?`
                    <br>
                    <div class='info-box-attribute-label'>capacity: </div>
                    <div class='info-box-attribute-value'>${this.capacity}</div>` : ``
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