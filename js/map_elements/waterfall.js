function Waterfall(id,name,coordinates,iconImageLocation,height,description){
    this.id = id
    this.name = name
    this.marker
    this.height = height
    this.coordinates = coordinates
    this.iconImage = iconImageLocation
    this.description = description

    this.minorInfoWindowContent = "<div class='info-box-container'>" 
    this.minorInfoWindowContent += "<div class='minor-info-box-title'>" + this.name + "</div>"
    if(this.height){
        this.minorInfoWindowContent += "<div class='minor-info-box-attribute-label'>height: </div>" 
        this.minorInfoWindowContent += "<div class='minor-info-box-attribute-value'>" + this.height +"m</div>"
    }
    this.minorInfoWindowContent += "</div>"

    this.majorInfoWindowContent = "<div class='info-box-container'>" 
    this.majorInfoWindowContent += "<div class='major-info-box-title'>" + this.name + "</div>"
    if(this.height){
        this.majorInfoWindowContent += "<div class='major-info-box-attribute-label'>height: </div>" 
        this.majorInfoWindowContent += "<div class='major-info-box-attribute-value'>" + this.height +"m</div>"
    }
    if(this.description){
        this.majorInfoWindowContent += "<div class='major-info-box-description' >" + this.description + "</div>"
    }
    this.majorInfoWindowContent += "</div>"
}