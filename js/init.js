function init() {
  // Initializa the Map

  app = new Application()
  app.eventsHandler.attachInitialListeners()
  app.loadMapElements("hut").then(
    function(){app.drawMapElements("hut")})
  app.loadMapElements("campsite").then(
    function(){app.drawMapElements("campsite")})
  app.loadMapElements("cave").then(
    function(){app.drawMapElements("cave")})
  app.loadMapElements("waterfall").then(
    function(){app.drawMapElements("waterfall")})
  app.loadMapElements('path').then(
    function(){app.drawMapElements("path")})

  app.loadTools()
}

