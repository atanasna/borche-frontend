function init() {
  // Initializa the Map

  app = new Application()
  app.loadMapElements("huts").then(
    function(){app.drawMapElements("huts")})
  app.loadMapElements("campsites").then(
    function(){app.drawMapElements("campsites")})
  app.loadMapElements("caves").then(
    function(){app.drawMapElements("caves")})
  app.loadMapElements("waterfalls").then(
    function(){app.drawMapElements("waterfalls")})
  app.loadMapElements('paths').then(
    function(){app.drawMapElements("paths")})
}

