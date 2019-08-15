class EventsHandler{
    constructor(){
        //Right Nav
            //this.add_button = document.querySelector("#right-nav-add-tool");
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
        //this.addElementButtonListener()
        
        //Left Navigation
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
        // Left navigation
            showLeftNavButtonListener(){
                this.show_lnav_button.addEventListener("click", function() {
                    var nav = document.querySelector(".left-nav").style.display = "block"
                });
            }
            hideLeftNavButtonListener(){
                this.hid_lnav_button.addEventListener("click", function() {
                    document.querySelector(".left-nav").style.display = "none"
                });
            }
            missionButtonListener(){
                this.mission_button.addEventListener("click", function(){
                    app.mainWindow.body.innerHTML = app.htmlBuilder.missionPage()
                    app.mainWindow.setVisibility(true)
                })
            }
            teamButtonListener(){
                this.team_button.addEventListener("click", function(){
                    app.mainWindow.body.innerHTML = app.htmlBuilder.teamPage()
                    app.mainWindow.setVisibility(true)
                })
            }
            helpButtonListener(){
                this.help_button.addEventListener("click", function(){
                    app.mainWindow.body.innerHTML = app.htmlBuilder.helpPage() 
                    app.mainWindow.setVisibility(true)
                })
            }
            donateButtonListener(){
                this.donate_button.addEventListener("click", function(){
                    app.mainWindow.body.innerHTML = app.htmlBuilder.donatePage() 
                    app.mainWindow.setVisibility(true)
                })
            }
            partnersButtonListener(){
                this.partners_button.addEventListener("click", function(){
                    app.mainWindow.body.innerHTML = app.htmlBuilder.partnerPage() 
                    app.mainWindow.setVisibility(true)
                })
            }
            contactsButtonListener(){
                this.contacts_button.addEventListener("click", function(){
                    app.mainWindow.body.innerHTML = app.htmlBuilder.contactsPage() 
                    app.mainWindow.setVisibility(true)
                })
            }
}