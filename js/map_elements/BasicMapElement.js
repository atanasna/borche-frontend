class BasicMapElement{
    constructor(id,name,coordinates,iconImageLocation,description){
        this.id = id
        this.name = name
        this.coordinates = coordinates
        this.iconImage = iconImageLocation
        this.description = description
    }

    minorInfoWindowContent(){
        var container = document.createElement('div');
        container.innerHTML = `
            <div class='info-box-container'>
                <div class='minor-info-box-title'>${this.name}</div>
            </div>
        `
        return container
    }
}