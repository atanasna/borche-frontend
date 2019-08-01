class NewElement extends BasicTool {
    constructor(button_id,button_class,placeholder,icon_url){
        super(button_id,button_class,placeholder,icon_url)
        //this.button = this.addHTMLSearchButton("right-nav-search-tool","right-nav-button")    

        this.attachNewElementButtonListener()
        //this.addListener()
    }

    // Event Listeners
    attachNewElementButtonListener(){
        let self = this
        this.button.addEventListener("click", function(){
            app.mainWindow.body.innerHTML = app.htmlBuilder.newElement()
            document.querySelector(".form-container").innerHTML = null
            self.attachDropDownListener()
            app.mainWindow.setVisibility(true)
        })
    }

    attachDropDownListener(){
        let self = this
        document.querySelector(".add-element-select")
        .addEventListener("change", function(evt){
            let type = evt.target.value
            app.mainWindow.body.innerHTML = app.htmlBuilder.newElement(type)
            self.attachDropDownListener()
            self.attachSubmitListener(type)
        })  
    }

    attachSubmitListener(type){

        document.querySelector("#new-element-submit")
        .addEventListener("click", function(evt){
            let new_element = null
            let name = document.querySelector("#new-element-name").value
            let latitude = parseFloat(document.querySelector("#new-element-latitude").value)
            let longitude = parseFloat(document.querySelector("#new-element-longitude").value)
            let description = document.querySelector("#new-element-description").value
            let images = document.querySelector("#new-element-images").files

            if(type=="hut"){
                // Hut (id,name,coordinates,approved,altitude,capacity,description,images)
                new_element = new Hut(null, 
                    name, 
                    {lat:latitude,lng:longitude},
                    false,
                    parseInt(document.querySelector(".hut-altitude").value),
                    parseInt(document.querySelector(".hut-capacity").value),
                    description,
                    images)
            }
            //Campsites(id,name,coordinates,approved,description,images){
            if(type=="campsite"){
                new_element = new Campsite(null, 
                    name, 
                    {lat:latitude,lng:longitude},
                    false,
                    description,
                    images)
            }
            //Cave(id,name,coordinates,approved,depth,lenght,description,images)
            if(type=="cave"){
                new_element = new Cave(null, 
                    name, 
                    {lat:latitude,lng:longitude},
                    false,
                    parseInt(document.querySelector(".cave-depth").value),
                    parseInt(document.querySelector(".cave-length").value),
                    description,
                    images)
            }
            //Waterfall(id,name,coordinates,approved,height,description,images)
            if(type=="waterfall"){
                new_element = new Waterfall(null, 
                    name, 
                    {lat:latitude,lng:longitude},
                    false,
                    parseInt(document.querySelector(".waterfall-height").value),
                    description,
                    images)
            }

            let errors_container = document.querySelector(".form-failure-msg")
            let success_container = document.querySelector(".form-success-msg")
            let errors_content = "<ul>"

            if(new_element.isValid().code){   // InputChecks -Frontendside
                app.backendConnector.addMapElement(new_element,type)
                .then(function(response){
                    console.log(type)
                    console.log(response.element.id)
                    if(response.result=="failure"){
                        Object.keys(response.messages).forEach(function (key) { 
                            console.log(response.messages[key])
                            errors_content += `<li>${response.messages[key][0]}</li>`
                        })
                        errors_content += "<ul>"
                        errors_container.innerHTML = "<div style='padding:10px'>" + errors_content + "</div>"
                    }
                    else{
                        errors_container.innerHTML = null
                        success_container.innerHTML = "<div style='padding:10px'>Success</div>"
                        app.loadMapElement(response.element.id,type).then(function(){
                            app.drawMapElement(app.layers[type].elements[app.layers[type].elements.length-1])
                        })
                    }
                })
            }
            else{
                new_element.isValid().errors.forEach(function(error_msg){
                    errors_content += `<li>${error_msg}</li>`
                })
                errors_content += "<ul>"
                errors_container.innerHTML = "<div style='padding:10px'>" + errors_content + "</div>"
            }
        })
    }
}


//