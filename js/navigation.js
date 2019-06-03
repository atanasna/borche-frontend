
document.querySelector(".left-nav-hamburger").addEventListener("click", function() {
  var nav = document.querySelector(".left-nav").style.zIndex = 30
});

document.querySelector(".left-nav-back").addEventListener("click", function() {
  document.querySelector(".left-nav").style.zIndex = 5
});

toggled_huts = true
toggled_campsites = true
toggled_caves = true
toggled_waterfalls = true
toggled_paths = true

var toggle_huts_button = document.querySelector(".toggle-huts");
var toggle_campsites_button = document.querySelector(".toggle-campsites");
var toggle_caves_button = document.querySelector(".toggle-caves");
var toggle_waterfalls_button = document.querySelector(".toggle-waterfalls");
var toggle_paths_button = document.querySelector(".toggle-paths");

toggle_huts_button.addEventListener("click", function(){
  if(toggled_huts){
    toggle_huts_button.innerHTML  = "<img src=\"resources/icons/no_hut32.png\">"
    toggled_huts = false
    appHandler.hideObjects("huts")
  }
  else{
    toggle_huts_button.innerHTML  = "<img src='resources/icons/hut32.png'>"
    toggled_huts = true
    appHandler.showObjects("huts")
  }
})
toggle_campsites_button.addEventListener("click", function(){
  if(toggled_campsites){
    toggle_campsites_button.innerHTML  = "<img src='resources/icons/no_campsite32.png'>"
    toggled_campsites = false
    appHandler.hideObjects("campsites")
  }
  else{
    toggle_campsites_button.innerHTML  = "<img src='resources/icons/campsite32.png'>"
    toggled_campsites = true
    appHandler.showObjects("campsites")
  }
})
toggle_caves_button.addEventListener("click", function(){
  if(toggled_caves){
    toggle_caves_button.innerHTML  = "<img src='resources/icons/no_cave32.png'>"
    toggled_caves = false
    appHandler.hideObjects("caves")
  }
  else{
    toggle_caves_button.innerHTML  = "<img src='resources/icons/cave32.png'>"
    toggled_caves = true
    appHandler.showObjects("caves")
  }
})
toggle_waterfalls_button.addEventListener("click", function(){
  if(toggled_waterfalls){
    toggle_waterfalls_button.innerHTML  = "<img src='resources/icons/no_waterfall32.png'>"
    toggled_waterfalls = false
    appHandler.hideObjects("waterfalls")
  }
  else{
    toggle_waterfalls_button.innerHTML  = "<img src='resources/icons/waterfall32.png'>"
    toggled_waterfalls = true
    appHandler.showObjects("waterfalls")
  }
})
toggle_paths_button.addEventListener("click", function(){
  if(toggled_paths){
    toggle_paths_button.innerHTML  = "<img src='resources/icons/no_mountain32.png'>"
    toggled_paths = false
    appHandler.hideObjects("paths")
  }
  else{
    toggle_paths_button.innerHTML  = "<img src='resources/icons/mountain32.png'>"
    toggled_paths = true
    appHandler.showObjects("paths")
  }
})