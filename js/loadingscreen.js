var time = 1500;
function show() {
  document.getElementById("loading-container").style.display="block";
  setTimeout("hide()", time);  // 5 seconds
}

function hide() {
  document.getElementById("loading-container").style.display="none";
}

show();