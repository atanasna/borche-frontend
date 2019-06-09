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
        if(type=="huts"){ url = backend_huts_url}
        if(type=="caves"){ url = backend_caves_url}
        if(type=="paths"){ url = backend_paths_url}
        if(type=="campsites"){ url = backend_campsites_url}
        if(type=="waterfalls"){ url = backend_waterfalls_url}
        return url
    }
    getMapElements(type){
        var url = this.matchUrlbyType(type)

        return fetch(url,{mode: 'cors'})
        .then( response => response.json() )
        .then( function(data){
            var elements = []
            for (var i = 0; i<data.length; i++){
                if(type == "huts"){
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
                if(type == "campsites"){
                    var campsite = new Campsite(
                        data[i]['id'],
                        data[i]['name'],
                        {lat: data[i]['latitude'], lng: data[i]['longitude']},
                        data[i]['approved'],
                        data[i]['description'])
                    elements.push(campsite)
                }
                if(type == "caves"){
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
                if(type == "waterfalls"){
                    var wf = new Waterfall(
                        data[i]['id'],
                        data[i]['name'],
                        {lat: data[i]['latitude'], lng: data[i]['longitude']},
                        data[i]['approved'],
                        data[i]['height'],
                        data[i]['description'])
                    elements.push(wf)
                }
                if(type == "paths"){
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
            return element
        })
    }

    addMapElement(element,type){
        var url = `${this.matchUrlbyType(type)}`
        return postFetch(url,element)   
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