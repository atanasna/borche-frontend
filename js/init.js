var map;
var mapObjects = {
  huts:[],
  caves:[],
  waterfalls:[],
  campsites:[],
  paths:[],
  areas:[]
}

function init() {
  // Initializa the Map

  app = new Application()
  app.loadMapElements(fetch_huts_url,"huts").then(
    function(){app.drawMapElements("huts")})
  app.loadMapElements(fetch_campsites_url,"campsites").then(
    function(){app.drawMapElements("campsites")})
  app.loadMapElements(fetch_caves_url,"caves").then(
    function(){app.drawMapElements("caves")})
  app.loadMapElements(fetch_waterfalls_url,"waterfalls").then(
    function(){app.drawMapElements("waterfalls")})
  app.loadMapElements(fetch_paths_url,'paths').then(
    function(){app.drawMapElements("paths")})
}

