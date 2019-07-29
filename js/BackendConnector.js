var backend_huts_url = "http://borche-api.pentatope.co.uk/huts"
var backend_campsites_url = "http://borche-api.pentatope.co.uk/campsites"
var backend_caves_url = "http://borche-api.pentatope.co.uk/caves"
var backend_waterfalls_url = "http://borche-api.pentatope.co.uk/waterfalls"
var backend_paths_url = "http://borche-api.pentatope.co.uk/paths"

class BackendConnector{
    constructor(){
    }

    matchUrlbyType(type){
        var url
        if(type=="hut"){ url = backend_huts_url}
        if(type=="cave"){ url = backend_caves_url}
        if(type=="path"){ url = backend_paths_url}
        if(type=="campsite"){ url = backend_campsites_url}
        if(type=="waterfall"){ url = backend_waterfalls_url}
        return url
    }
    getMapElements(type){
        var url = this.matchUrlbyType(type)

        return fetch(url,{mode: 'cors'})
        .then( response => response.json() )
        .then( function(data){
            var elements = []
            for (var i = 0; i<data.length; i++){
                if(type == "hut"){
                    var hut = new Hut(
                        data[i]['id'],
                        data[i]['name'],
                        {lat: data[i]['latitude'], lng: data[i]['longitude']},
                        data[i]['approved'],
                        data[i]['altitude'],
                        data[i]['capacity'],
                        data[i]['description'])
                    elements.push(hut)
                }
                if(type == "campsite"){
                    var campsite = new Campsite(
                        data[i]['id'],
                        data[i]['name'],
                        {lat: data[i]['latitude'], lng: data[i]['longitude']},
                        data[i]['approved'],
                        data[i]['description'])
                    elements.push(campsite)
                }
                if(type == "cave"){
                    var cave = new Cave(
                        data[i]['id'],
                        data[i]['name'],
                        {lat: data[i]['latitude'], lng: data[i]['longitude']},
                        data[i]['approved'],
                        data[i]['depth'],
                        data[i]['lenght'],
                        data[i]['description'])
                    elements.push(cave)
                }
                if(type == "waterfall"){
                    var wf = new Waterfall(
                        data[i]['id'],
                        data[i]['name'],
                        {lat: data[i]['latitude'], lng: data[i]['longitude']},
                        data[i]['approved'],
                        data[i]['height'],
                        data[i]['description'])
                    elements.push(wf)
                }
                if(type == "path"){
                    var coordinates = []
                    for (var j = 0; j<data[i]['latitudes'].length; j++){
                        coordinates.push({lat:data[i]['latitudes'][j], lng:data[i]['longitudes'][j]})
                    }

                    var path = new Path(
                        data[i]['id'],
                        data[i]['name'],
                        coordinates,
                        data[i]['color'],
                        data[i]['lenght'],
                        data[i]['time'],
                        data[i]['description']) 
                    elements.push(path)   
                }
            }
            return elements
        })
    }

    getMapElement(id,type){
        var url = `${this.matchUrlbyType(type)}/${id}`
        console.log(url)
        return fetch(url,{mode: 'cors'})
        .then( response => response.json() )
        .then( function(element){
            console.log(element)
            return element
        })
    }

    addMapElement(mapElement,type){
        var url = `${this.matchUrlbyType(type)}`
        return fetch(url, {
            method: 'POST',
            body: mapElement.toFormData(),
        }).then(response => response.json())
        .then(function(data){
            return data
        })
    }
}

//Helpers
    function postFetch(url = '', data = {}) {
        // Default options are marked with *
        return fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(response => response.json()); // parses JSON response into native Javascript objects 
    }