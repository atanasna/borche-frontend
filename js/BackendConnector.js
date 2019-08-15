var backend_huts_url = "http://api.borchee.com/huts"
var backend_campsites_url = "http://api.borchee.com/campsites"
var backend_caves_url = "http://api.borchee.com/caves"
var backend_waterfalls_url = "http://api.borchee.com/waterfalls"
var backend_paths_url = "http://api.borchee.com/paths"
var backend_areas_url = "http://api.borchee.com/areas"

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
        if(type=="area"){ url = backend_areas_url}
        return url
    }
    getMapElements(type){
        var self = this
        var url = this.matchUrlbyType(type)

        return fetch(url,{mode: 'cors'})
        .then( response => response.json() )
        .then( function(data){
            var elements = []
            for (var i = 0; i<data.length; i++){
                elements.push(self.jsonToMapElement(type, data[i]))
            }
            return elements
        })
    }

    getMapElement(id,type){
        var self = this
        var url = `${this.matchUrlbyType(type)}/${id}`

        return fetch(url,{mode: 'cors'})
        .then( response => response.json() )
        .then( function(data){
            return self.jsonToMapElement(type, data)
        })
    }

    addMapElement(element,type){
        var url = `${this.matchUrlbyType(type)}`
        return fetch(url, {
            method: 'POST',
            body: element.toFormData(),
        }).then(response => response.json())
        .then(function(data){
            return data
        })
    }

    jsonToMapElement(type,data){
        if(type == "hut"){
            return Hut.fromJson(data)
        }
        if(type == "campsite"){
            return Campsite.fromJson(data)
        }
        if(type == "cave"){
            return Cave.fromJson(data)
        }
        if(type == "waterfall"){
            return Waterfall.fromJson(data)
        }
        if(type == "path"){
            return Path.fromJson(data)
        }
        if(type == "area"){
            return Area.fromJson(data)
        }
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