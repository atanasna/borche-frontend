document.querySelector(".left-nav-hamburger").addEventListener("click", function() {
  var nav = document.querySelector(".left-nav").style.zIndex = 30
});

document.querySelector(".left-nav-back").addEventListener("click", function() {
  document.querySelector(".left-nav").style.zIndex = 5
});

var is_idea_visible = false
var idea_button = document.querySelector(".left-nav-idea");

idea_button.addEventListener("click", function(){
  if(is_idea_visible){
    console.log("idea-close")
    is_idea_visible = false
    
    //toggle_huts_button.innerHTML  = "<img src=\"resources/icons/no_hut32.png\">"
  }
  else{
    //toggle_huts_button.innerHTML  = "<img src='resources/icons/hut32.png'>"
    console.log("idea-open")
    is_idea_visible = true
  }
})