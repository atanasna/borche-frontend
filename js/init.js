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

  appHandler = new AppHandler()
  //sleep(500);
  appHandler.loadObjects('http://borche-api.pentatope.co.uk/huts',"huts")
  appHandler.loadObjects('http://borche-api.pentatope.co.uk/campsites',"campsites")
  appHandler.loadObjects('http://borche-api.pentatope.co.uk/caves',"caves")
  appHandler.loadObjects('http://borche-api.pentatope.co.uk/waterfalls',"waterfalls")
  appHandler.loadObjects('http://borche-api.pentatope.co.uk/paths','paths')
  
}

