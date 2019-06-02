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

  console.log(appHandler)
  //var options = {
  //  zoom:12,
  //  center: {lat: 42.723943, lng: 24.985956},
  //  //center: {lat: 37.772, lng: -122.214},
  //  mapTypeId: 'roadmap'
  //}
  //map = new google.maps.Map(document.getElementById('map'), options);

  // Load Map Elements
    //loadMapObjects('http://192.168.50.115:3000/huts','resources/icons/hut32.png')
    //loadMapObjects('http://192.168.50.115:3000/waterfalls','resources/icons/waterfall32.png')
    //loadMapObjects('http://192.168.50.115:3000/caves','resources/icons/cave32.png')
    //loadMapObjects('http://192.168.50.115:3000/campsites','resources/icons/fire32.png')
    //loadMapPaths('http://192.168.50.115:3000/paths').then(drawMapPaths)
    //loadMapAreas('http://192.168.50.115:3000/areas').then(drawMapAreas)

  // Draw Map Elements
    //drawMapObjects()
  
    //drawMapAreas()

  //console.log(mapObjects)
  //console.log(mapPaths)
}

// Methods for LOADING the Map Elements
  function loadMapObjects(url,icon){
    fetch(url,{mode: 'cors'})
    .then( response => response.json() )
    .then( function(data){
      for (i = 0; i<data.length; i++){
        mapObjects.push({
          coordinates: {lat: data[i]['latitude'], lng: data[i]['longitude']},
          iconImage: icon,
          content: '<h1>' + data[i]['name'] +'</h1>'
        }) 
        //addMarker({
        //  coordinates: {lat: data[i]['latitude'], lng: data[i]['longitude']},
        //  iconImage: icon,
        //  content: '<h1>' + data[i]['name'] +'</h1>'
        //})
      }
    })
  }

  function loadMapPaths(url){
    return fetch(url,{mode: 'cors'})
    .then( response => response.json() )
    .then( function(data){
      for (i = 0; i<data.length; i++){
        var coordinates = []
        for (j = 0; j<data[i]['latitudes'].length; j++){
          coordinates.push({lat:data[i]['latitudes'][j], lng:data[i]['longitudes'][j]})
        }
        //console.log(coordinates)
        //console.log(data[i]["color"])
        mapObjects.paths.push({
          coordinates: coordinates,
          color: data[i]["color"]
        })

        //addPath(coordinates,data[i]["color"])
      }
    })
  }

  function loadMapAreas(url){
    // TO BE IMPLEMENTED
  }
// Methods for DRAWING the Elements on the Map
  function drawMapObjects(){
    const array = ["one", "two", "three"]
    array.forEach(function (item, index) {
      console.log(item, index);
    });
    console.log()
    mapObjects.forEach(function (item, index) {
      console.log(item, index);
    });
  }
  function drawMapPaths(){
    mapObjects.paths.forEach(addPath)
  }
  function drawMapAreas(){
    // TO BE IMPLEMENTED
  }

