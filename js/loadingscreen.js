var time = 1500;
function show() {
  document.getElementById("myDiv").style.display="block";
  setTimeout("hide()", time);  // 5 seconds
}

function hide() {
  document.getElementById("myDiv").style.display="none";
}

show();