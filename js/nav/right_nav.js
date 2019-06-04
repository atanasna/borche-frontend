var are_huts_visible = true
var are_campsites_visible = true
var are_caves_visible = true
var are_waterfalls_visible = true
var are_paths_visible = true

var huts_button = document.querySelector(".right-nav-huts");
var campsites_button = document.querySelector(".right-nav-campsites");
var caves_button = document.querySelector(".right-nav-caves");
var waterfalls_button = document.querySelector(".right-nav-waterfalls");
var paths_button = document.querySelector(".right-nav-paths");

huts_button.addEventListener("click", function(){
  if(are_huts_visible){
    huts_button.innerHTML  = "<img src=\"resources/icons/no_hut32.png\">"
    are_huts_visible = false
    appHandler.hideObjects("huts")
  }
  else{
    huts_button.innerHTML  = "<img src='resources/icons/hut32.png'>"
    are_huts_visible = true
    appHandler.showObjects("huts")
  }
})
campsites_button.addEventListener("click", function(){
  if(are_campsites_visible){
    campsites_button.innerHTML  = "<img src='resources/icons/no_campsite32.png'>"
    are_campsites_visible = false
    appHandler.hideObjects("campsites")
  }
  else{
    campsites_button.innerHTML  = "<img src='resources/icons/campsite32.png'>"
    are_campsites_visible = true
    appHandler.showObjects("campsites")
  }
})
caves_button.addEventListener("click", function(){
  if(are_caves_visible){
    caves_button.innerHTML  = "<img src='resources/icons/no_cave32.png'>"
    are_caves_visible = false
    appHandler.hideObjects("caves")
  }
  else{
    caves_button.innerHTML  = "<img src='resources/icons/cave32.png'>"
    are_caves_visible = true
    appHandler.showObjects("caves")
  }
})
waterfalls_button.addEventListener("click", function(){
  if(are_waterfalls_visible){
    waterfalls_button.innerHTML  = "<img src='resources/icons/no_waterfall32.png'>"
    are_waterfalls_visible = false
    appHandler.hideObjects("waterfalls")
  }
  else{
    waterfalls_button.innerHTML  = "<img src='resources/icons/waterfall32.png'>"
    are_waterfalls_visible = true
    appHandler.showObjects("waterfalls")
  }
})
paths_button.addEventListener("click", function(){
  if(are_paths_visible){
    paths_button.innerHTML  = "<img src='resources/icons/no_path32.png'>"
    are_paths_visible = false
    appHandler.hideObjects("paths")
  }
  else{
    paths_button.innerHTML  = "<img src='resources/icons/path32.png'>"
    are_paths_visible = true
    appHandler.showObjects("paths")
  }
})