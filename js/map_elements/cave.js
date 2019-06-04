function Cave(id, name,coordinates,iconImageLocation,depth,lenght,description){
    this.id = id
    this.name = name
    this.marker
    this.depth = depth
    this.lenght = lenght
    this.coordinates = coordinates
    this.iconImage = iconImageLocation
    this.description = this.description

    this.minorInfoWindowContent = "<div class='info-box-container'>" 
    this.minorInfoWindowContent += "<div class='minor-info-box-title'>" + this.name + "</div>"
    if(this.depth){
        this.minorInfoWindowContent += "<div class='minor-info-box-attribute-label'>depth: </div>" 
        this.minorInfoWindowContent += "<div class='minor-info-box-attribute-value'>" + this.depth +"m</div>"
    }
    if(this.lenght){
        this.minorInfoWindowContent += "<br><div class='minor-info-box-attribute-label'>lenght: </div>" 
        this.minorInfoWindowContent += "<div class='minor-info-box-attribute-value'>" + this.lenght +"m</div>"
    }
    this.minorInfoWindowContent += "</div>"

    this.majorInfoWindowContent = "<div class='info-box-container'>" 
    this.majorInfoWindowContent += "<div class='major-info-box-title'>" + this.name + "</div>"
    if(this.depth){
        this.majorInfoWindowContent += "<div class='major-info-box-attribute-label'>depth: </div>" 
        this.majorInfoWindowContent += "<div class='major-info-box-attribute-value'>" + this.depth +"m</div>"
    }
    if(this.lenght){
        this.majorInfoWindowContent += "<div class='major-info-box-attribute-label'>, lenght: </div>" 
        this.majorInfoWindowContent += "<div class='major-info-box-attribute-value'>" + this.lenght +"m </div>"
    }
    if(this.description){
        this.majorInfoWindowContent += "<div class='major-info-box-description' >" + this.description + "</div>"
    }
    this.majorInfoWindowContent += "</div>"
}