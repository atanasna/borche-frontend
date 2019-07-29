class Add extends BasicTool {
    constructor(button_id,button_class,icon_url){
        super(button_id,button_class,icon_url)
        //this.button = this.addHTMLSearchButton("right-nav-search-tool","right-nav-button")    
        this.inputBox = this.addHTMLSearchBox("pac-input","controls")
        this.searchBox = new google.maps.places.SearchBox(this.inputBox)
        
        this.addButtonListener()
        //this.addListener()
    }

    addHTMLSearchBox(searcBox_id,searchBox_class){
        var searchBox = document.createElement("input");
        searchBox.setAttribute("type", "text");
        searchBox.setAttribute("class", searchBox_class);
        searchBox.setAttribute("id", searcBox_id);
        searchBox.setAttribute("style","display: none;")
        searchBox.setAttribute("placeholder","Borchee Search")
        document.body.appendChild(searchBox);
        return searchBox
    }

    // Event Listeners
    addSearchButtonListener(){
        
    }
    addSearchBoxListener(){
        
    }    
}


//