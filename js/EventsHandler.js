class EventsHandler{
    constructor(){
        //Right Nav
            this.add_button = document.querySelector(".right-nav-add-tool");
            this.search_button = document.querySelector(".right-nav-search-tool");
        //Left Nav
            this.show_lnav_button = document.querySelector(".left-nav-hamburger")
            this.hid_lnav_button = document.querySelector(".left-nav-back")
            this.mission_button = document.querySelector(".left-nav-mission")
            this.team_button = document.querySelector(".left-nav-team")
            this.help_button = document.querySelector(".left-nav-help")
            this.donate_button = document.querySelector(".left-nav-donate")
            this.partners_button = document.querySelector(".left-nav-partners")
            this.contacts_button = document.querySelector(".left-nav-contacts")
    }

    attachInitialListeners(){
        this.layerFilterButtonListener("huts",'resources/icons/hut32.png','resources/icons/no_hut32.png')
        this.layerFilterButtonListener("caves",'resources/icons/cave32.png','resources/icons/no_cave32.png')
        this.layerFilterButtonListener("waterfalls",'resources/icons/waterfall32.png','resources/icons/no_waterfall32.png')
        this.layerFilterButtonListener("campsites",'resources/icons/campsite32.png','resources/icons/no_campsite32.png')
        this.layerFilterButtonListener("paths",'resources/icons/path32.png','resources/icons/no_path32.png')

        this.addToolButtonListener()
        this.showLeftNavButtonListener()
        this.hideLeftNavButtonListener()
        this.missionButtonListener()
        this.teamButtonListener()
        this.helpButtonListener()
        this.donateButtonListener()
        this.partnersButtonListener()
        this.contactsButtonListener()
    }

    //Navigation
        // Right navigation
            layerFilterButtonListener(type,onImageUrl,offImageUrl){
                let button = document.querySelector(`.right-nav-${type}-filter`)
                button.addEventListener("click", function(){
                    if(app.layers[type].visible){
                        button.innerHTML  = `<img src=${offImageUrl}>`
                        app.hideObjects(type)
                    }
                    else{
                        button.innerHTML = `<img src=${onImageUrl}>`
                        app.showObjects(type)
                    }
                })
            }
            addToolButtonListener(){
                let self = this
                self.add_button.addEventListener("click", function(){
                    var mainWindow = app.getMainWindowContainer()
                    mainWindow.innerHTML = app.htmlBuilder.mapElementAdd()
                    document.querySelector(".form-container").innerHTML = null
                    self.addFormDropdownListener()
                    app.showMainWindow()
                })
            }
        // Left navigation
            showLeftNavButtonListener(){
                this.show_lnav_button.addEventListener("click", function() {
                    var nav = document.querySelector(".left-nav").style.zIndex = 30
                });
            }
            hideLeftNavButtonListener(){
                this.hid_lnav_button.addEventListener("click", function() {
                    document.querySelector(".left-nav").style.zIndex = 5
                });
            }
            missionButtonListener(){
                this.mission_button.addEventListener("click", function(){
                    app.getMainWindowContainer().innerHTML = app.htmlBuilder.missionPage()
                    app.showMainWindow()
                })
            }
            teamButtonListener(){
                this.team_button.addEventListener("click", function(){
                    app.getMainWindowContainer().innerHTML = app.htmlBuilder.teamPage()
                    app.showMainWindow()
                })
            }
            helpButtonListener(){
                this.help_button.addEventListener("click", function(){
                    app.getMainWindowContainer().innerHTML = app.htmlBuilder.helpPage() 
                    app.showMainWindow()
                })
            }
            donateButtonListener(){
                this.donate_button.addEventListener("click", function(){
                    app.getMainWindowContainer().innerHTML = app.htmlBuilder.donatePage() 
                    app.showMainWindow()
                })
            }
            partnersButtonListener(){
                this.partners_button.addEventListener("click", function(){
                    app.getMainWindowContainer().innerHTML = app.htmlBuilder.partnerPage() 
                    app.showMainWindow()
                })
            }
            contactsButtonListener(){
                this.contacts_button.addEventListener("click", function(){
                    app.getMainWindowContainer().innerHTML = app.htmlBuilder.contactsPage() 
                    app.showMainWindow()
                })
            }
    
    //Forms
        addFormDropdownListener(){
            let self = this
            document.querySelector(".add-element-select")
            .addEventListener("change", function(evt){
                let type = evt.target.value
                let container = app.getMainWindowContainer()
                console.log(evt.target.value)
                container.innerHTML = app.htmlBuilder.mapElementAdd(type)
                self.addFormDropdownListener()
                self.addFormSubmitListener(type)
            })
        }
        addFormSubmitListener(type){
            document.querySelector(".map-element-submit")
            .addEventListener("click", function(evt){
                let new_element = null
                let name = document.querySelector(".map-element-name").value
                let latitude = parseFloat(document.querySelector(".map-element-latitude").value)
                let longitude = parseFloat(document.querySelector(".map-element-longitude").value)
                let description = document.querySelector(".map-element-description").value
                let images = document.querySelector(".map-element-images").files

                const formData = new FormData();
                for (let i = 0; i < images.length; i++) {
                    let image = images[i]
                    formData.append('images[]', image)
                }
                formData.set('name', name)
                formData.set('latitude', latitude)
                formData.set('longitude', longitude)
                formData.set('description', description)
                if(type=="huts"){
                    formData.set('altitude', document.querySelector(".hut-altitude").value)
                    formData.set('capacity', document.querySelector(".hut-capacity").value)
                    //new_element = new Hut(null, 
                    //    name, 
                    //    {lat:latitude,lng:longitude},
                    //    false,
                    //    parseInt(document.querySelector(".hut-altitude").value),
                    //    parseInt(document.querySelector(".hut-capacity").value),
                    //    description,
                    //    images)
                }
                if(type=="campsites"){
                    new_element = new Campsite(null, 
                        name, 
                        {lat:latitude,lng:longitude},
                        false,
                        description)
                }
                if(type=="caves"){
                    new_element = new Cave(null, 
                        name, 
                        {lat:latitude,lng:longitude},
                        false,
                        parseInt(document.querySelector(".cave-depth").value),
                        parseInt(document.querySelector(".cave-length").value),
                        description)
                }
                if(type=="waterfalls"){
                    new_element = new Waterfall(null, 
                        name, 
                        {lat:latitude,lng:longitude},
                        false,
                        parseInt(document.querySelector(".waterfall-height").value),
                        description)
                }

                console.log(123)
                console.log(formData.keys())

                let errors_container = document.querySelector(".form-failure-msg")
                let errors_content = "<ul>"
                //if(new_element.isValid().code){
                if(true){
                    //app.backendConnector.addMapElement(new_element.toJson(),type)
                    fetch("http://borche-api.pentatope.co.uk/huts", {
                        method: 'POST',
                        body: formData,
                      }).then(function(response){
                        if(response.result=="failure"){
                            Object.keys(response.messages).forEach(function (key) { 
                                console.log(response.messages[key])
                                errors_content += `<li>${response.messages[key][0]}</li>`
                            })
                            errors_content += "<ul>"
                            errors_container.innerHTML = "<div style='padding:10px'>" + errors_content + "</div>"
                        }
                        else{
                            document.querySelector(".form-failure-msg").innerHTML = null
                            document.querySelector(".form-success-msg").innerHTML = "<div style='padding:10px'>Success</div>"
                        }
                        console.log(response)
                    })
                }
                else{
                    new_element.isValid().errors.forEach(function(error_msg){
                        errors_content += `<li>${error_msg}</li>`
                    })
                    errors_content += "<ul>"
                    errors_container.innerHTML = errors_content
                }
            })
        }
        //addHutFormSubmitListner(){
        //    document.querySelector(".map-element-submit")
        //    .addEventListener("click", function(evt){
        //        let name = document.querySelector(".add-hut-name").value;
        //        let latitude = parseFloat(document.querySelector(".add-hut-latitude").value);
        //        let longitude = parseFloat(document.querySelector(".add-hut-longitude").value);
        //        let altitude = parseInt(document.querySelector(".add-hut-altitude").value);
        //        let capacity = parseInt(document.querySelector(".add-hut-capacity").value);
//
        //        let hut = new Hut(null, name, {lat:latitude,lng:longitude},false,null,altitude,capacity,null)
//
        //        if(hut.isValid().code){
        //            let element = {}
        //            element.name = hut.name
        //            element.latitude = hut.coordinates.lat
        //            element.longitude = hut.coordinates.lng
        //            element.altitude = hut.altitude
        //            element.capacity = hut.capacity
        //            console.log(element)
        //            app.backendConnector.addMapElement(element,"huts")
        //            document.querySelector(".form-success-msg").innerHTML = "success"
        //        }
        //        else{
        //            let errors_container = document.querySelector(".form-failure-msg")
        //            let errors_content = "<ul>"
        //            hut.isValid().errors.forEach(function(error_msg){
        //                errors_content += `<li>${error_msg}</li>`
        //            })
        //            errors_content += "<ul>"
        //            errors_container.innerHTML = errors_content
        //        }
        //    })
        //}
        //addCaveFormSubmitListner(){
        //    document.querySelector(".add-cave-submit")
        //    .addEventListener("click", function(evt){
        //        let name = document.querySelector(".add-cave-name").value;
        //        let latitude = parseFloat(document.querySelector(".add-cave-latitude").value);
        //        let longitude = parseFloat(document.querySelector(".add-cave-longitude").value);
        //        let depth = parseInt(document.querySelector(".add-cave-depth").value);
        //        let length = parseInt(document.querySelector(".add-cave-length").value);
//
        //        let cave = new Cave(null, name, {lat:latitude,lng:longitude},false,null,depth,length,null)
//
        //        if(cave.isValid().code){
        //            let element = {}
        //            element.name = cave.name
        //            element.latitude = cave.coordinates.lat
        //            element.longitude = cave.coordinates.lng
        //            element.depth = cave.depth
        //            element.length = cave.length
        //            let res = app.backendConnector.addMapElement(element,"caves")
        //            console.log(res)
        //        }
        //        else{
        //            let errors_container = document.querySelector(".form-failure-msg")
        //            let errors_content = "<ul>"
        //            cave.isValid().errors.forEach(function(error_msg){
        //                errors_content += `<li>${error_msg}</li>`
        //            })
        //            errors_content += "<ul>"
        //            errors_container.innerHTML = errors_content
        //        }
        //    })
        //}
        //addCampsiteFormSubmitListner(){
        //    document.querySelector(".add-campsite-submit")
        //    .addEventListener("click", function(evt){
        //        let name = document.querySelector(".add-campsite-name").value;
        //        let latitude = parseFloat(document.querySelector(".add-campsite-latitude").value);
        //        let longitude = parseFloat(document.querySelector(".add-campsite-longitude").value);
        //        
        //        let campsite = new Hut(null, name, {lat:latitude,lng:longitude},false,null,null)
//
        //        if(campsite.isValid().code){
        //            let element = {}
        //            element.name = campsite.name
        //            element.latitude = campsite.coordinates.lat
        //            element.longitude = campsite.coordinates.lng
        //            app.backendConnector.addMapElement(element,"campsites")
        //        }
        //        else{
        //            let errors_container = document.querySelector(".form-failure-msg")
        //            let errors_content = "<ul>"
        //            campsite.isValid().errors.forEach(function(error_msg){
        //                errors_content += `<li>${error_msg}</li>`
        //            })
        //            errors_content += "<ul>"
        //            errors_container.innerHTML = errors_content
        //        }
        //    })
        //}
        //addWaterfallFormSubmitListner(){
        //    document.querySelector(".add-waterfall-submit")
        //    .addEventListener("click", function(evt){
        //        let name = document.querySelector(".add-waterfall-name").value;
        //        let latitude = parseFloat(document.querySelector(".add-waterfall-latitude").value);
        //        let longitude = parseFloat(document.querySelector(".add-waterfall-longitude").value);
        //        let height = parseInt(document.querySelector(".add-waterfall-height").value);
        //        
        //        let wf = new Waterfall(null, name, {lat:latitude,lng:longitude},false,null,height,null)
//
        //        if(wf.isValid().code){
        //            let element = {}
        //            element.name = wf.name
        //            element.latitude = wf.coordinates.lat
        //            element.longitude = wf.coordinates.lng
        //            element.height = wf.height
        //            app.backendConnector.addMapElement(element,"waterfalls")
        //        }
        //        else{
        //            let errors_container = document.querySelector(".form-failure-msg")
        //            let errors_content = "<ul>"
        //            wf.isValid().errors.forEach(function(error_msg){
        //                errors_content += `<li>${error_msg}</li>`
        //            })
        //            errors_content += "<ul>"
        //            errors_container.innerHTML = errors_content
        //        }
        //    })
        //}   
}