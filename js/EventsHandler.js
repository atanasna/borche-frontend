class EventsHandler{
    constructor(){
        //Right Nav
            this.add_button = document.querySelector("#right-nav-add-tool");
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
        //this.layerFilterButtonListener("huts", app.resourcer.icons.hut.color32, app.resourcer.icons.hut.scratched32)
        //this.layerFilterButtonListener("caves", app.resourcer.icons.cave.color32, app.resourcer.icons.cave.scratched32)
        //this.layerFilterButtonListener("waterfalls", app.resourcer.icons.waterfall.color32, app.resourcer.icons.waterfall.scratched32)
        //this.layerFilterButtonListener("campsites", app.resourcer.icons.campsite.color32, app.resourcer.icons.campsite.scratched32)
        //this.layerFilterButtonListener("paths", app.resourcer.icons.path.color32, app.resourcer.icons.path.scratched32)

        this.addElementButtonListener()
        //this.searchElementsButtonListener()
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
            addElementButtonListener(){
                let self = this
                self.add_button.addEventListener("click", function(){
                    var mainWindow = app.getMainWindowContainer()
                    mainWindow.innerHTML = app.htmlBuilder.mapElementAdd()
                    document.querySelector(".form-container").innerHTML = null
                    self.addFormDropdownListener()
                    app.showMainWindow()
                })
            }
            searchElementsButtonListener(){
                let self = this
                self.search_button.addEventListener("click", function(){
                    var searchbox = document.getElementById("pac-input");
                    if (searchbox.style.display === "none") {
                        searchbox.style.display = "block";
                    } else {
                        searchbox.style.display = "none";
                    }
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

                if(type=="huts"){
                    new_element = new Hut(null, 
                        name, 
                        {lat:latitude,lng:longitude},
                        false,
                        parseInt(document.querySelector(".hut-altitude").value),
                        parseInt(document.querySelector(".hut-capacity").value),
                        description,
                        images)
                }
                //if(type=="campsites"){
                //    new_element = new Campsite(null, 
                //        name, 
                //        {lat:latitude,lng:longitude},
                //        false,
                //        description)
                //}
                //if(type=="caves"){
                //    new_element = new Cave(null, 
                //        name, 
                //        {lat:latitude,lng:longitude},
                //        false,
                //        parseInt(document.querySelector(".cave-depth").value),
                //        parseInt(document.querySelector(".cave-length").value),
                //        description)
                //}
                //if(type=="waterfalls"){
                //    new_element = new Waterfall(null, 
                //        name, 
                //        {lat:latitude,lng:longitude},
                //        false,
                //        parseInt(document.querySelector(".waterfall-height").value),
                //        description)
                //}

                let errors_container = document.querySelector(".form-failure-msg")
                let success_container = document.querySelector(".form-success-msg")
                let errors_content = "<ul>"
                if(new_element.isValid().code){
                    console.log(new_element)
                    app.backendConnector.addMapElement(new_element,type)
                    .then(function(response){
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
                        }
                        console.log(response)
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