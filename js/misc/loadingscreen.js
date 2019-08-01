var time = 2500;

function show() {
    document.getElementById("loading-container").style.display="block";
    setTimeout("hide()", time);
}

function hide() {
    document.getElementById("loading-container").style.display="none";
}

show();