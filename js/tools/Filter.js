class Filter extends BasicTool{
    constructor(type,buttonId,buttonClass,placeholder,iconOnUrl,iconOffUrl){
        super(buttonId,buttonClass,placeholder,iconOnUrl)

        this.addButtonListener(type,iconOnUrl,iconOffUrl)
    }

    addButtonListener(type,iconOnUrl,iconOffUrl){
        var self = this
        this.button.addEventListener("click", function(){
            if(app.layers[type].visible){
                self.button.innerHTML  = `<img src=${iconOffUrl}>`
                app.hideObjects(type)
            }
            else{
                self.button.innerHTML = `<img src=${iconOnUrl}>`
                app.showObjects(type)
            }
        })
    }
}


//