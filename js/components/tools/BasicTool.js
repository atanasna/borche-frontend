class BasicTool {
    constructor(button_id,button_class,placeholder,icon_url){
        this.button = this.createButton(button_id,button_class,placeholder,icon_url)    
        //this.inputBox = this.addHTMLSearchBox("pac-input","controls")
        //this.searchBox = new google.maps.places.SearchBox(this.inputBox)
        
        //this.addAddButtonListener()
        //this.addSearchBoxListener()
    }

    // HTML Generators
    createButton(button_id, button_class, placeholder, icon_url){
        var placeholder = document.getElementById(placeholder)
        var button = document.createElement("div");
        button.setAttribute("id", button_id);
        button.setAttribute("class", button_class);
        var icon = document.createElement("img");
        icon.setAttribute("src",icon_url)
        placeholder.appendChild(button);
        button.appendChild(icon);
        return button
    }
}


//