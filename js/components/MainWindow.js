class MainWindow{
    constructor(){
        this.createMainWindow()
        this.attachCrossListener()
    }

    createMainWindow(){
        let container = document.createElement("div");
        container.innerHTML = `
            <div id="main-window-container" style="display:none">
                <div id="main-window-cross">
                    <img src=${app.resourcer.misc.cross}>
                </div>
                <div id="main-window-header"></div>
                <div id="main-window-body"></div>
                <div id="main-window-footer"></div>
            </div>`
        document.body.appendChild(container)

        this.container = document.querySelector("#main-window-container")  
        this.cross = document.querySelector("#main-window-cross")  
        this.header = document.querySelector("#main-window-header")
        this.body = document.querySelector("#main-window-body");
        this.footer = document.querySelector("#main-window-footer");
    }

    setVisibility(value){
        if (value) {
            this.container.style.display = "block";
        } else {
            this.container.style.display = "none";
        }
    }

    attachCrossListener(){
        var self = this
        this.cross.addEventListener("click", function(){
            self.setVisibility(false)
        })
    }
}


//document.querySelector(".main-cross").addEventListener("click", function(){
//    app.hideMainWindow()
//})


// Picture slider on Main window when object is opened
var slideIndex = 1;

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}