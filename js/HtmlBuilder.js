class HtmlBuilder{
    constructor(){

    }

    // MAP ELEMENTS
        mapElementMinorInfo(element,type){
            var container 
            if(type=="huts"){ container = this.sharedMinorInfo(element)}
            if(type=="caves"){ container = this.sharedMinorInfo(element)}
            if(type=="campsites"){ container = this.sharedMinorInfo(element)}
            if(type=="waterfalls"){ container = this.sharedMinorInfo(element)}
            if(type=="paths"){ container = this.pathMinorInfo(element)}    
            return container
        }
        mapElementMajorInfo(element,type){
            var container 
            if(type=="huts"){ container = this.hutMajorInfo(element)}
            if(type=="caves"){ container = this.caveMajorInfo(element)}
            if(type=="campsites"){ container = this.campsiteMajorInfo(element)}
            if(type=="waterfalls"){ container = this.waterfallMajorInfo(element)}
            return container
        }
        mapElementShow(element,type){
            var container 
            if(type=="huts"){ container = this.hutShow(element)}
            if(type=="caves"){ container = this.caveShow(element)}
            if(type=="campsites"){ container = this.campsiteShow(element)}
            if(type=="waterfalls"){ container = this.waterfallShow(element)}
            return container
        }
        mapElementAdd(type){
            var container = `
                <div class="main-title">Add new 
                    <select class="add-element-select">
                        <option value="huts" selected disabled hidden>What?</option>
                        <option value="huts" ${ type=="huts" ?`selected`:``} >Hut</option>
                        <option value="caves" ${ type=="caves" ?`selected`:``} >Cave</option>
                        <option value="waterfalls" ${ type=="waterfalls" ?`selected`:``} >Waterfall</option>
                        <option value="campsites" ${ type=="campsites" ?`selected`:``} >Campsite</option>
                    </select>
                </div>
                <hr>
                <div class="form-container">
                    <div class="form-msg form-failure-msg"></div>
                    <div class="form-msg form-success-msg"></div>
                    <div class="form-inputs">
                        <input class="map-element-name" type="text" placeholder="Name*" />
                        <br>
                        <input class="map-element-latitude" type="number" step="0.00001" placeholder="Latitude*" />
                        <input class="map-element-longitude" type="number" step="0.00001" placeholder="Longitude*" />
                        <br>
                        ${ type=="huts" ?`
                            <input class="hut-altitude" type="number" placeholder="Altitude" />
                            <br>
                            <input class="hut-capacity" type="number" placeholder="Capacity" />
                            <br>` : ``
                        }
                        ${ type=="waterfalls" ?`
                            <input class="waterfall-height" type="number" placeholder="Height" />
                            <br>` : ``
                        }
                        ${ type=="caves" ?`
                            <input class="cave-depth" type="number" placeholder="Depth" />
                            <br>
                            <input class="cave-length" type="number" placeholder="Length" />
                            <br>` : ``
                        }
                        ${ type=="campsites" ? `` : ``
                        }
                        <textarea class="map-element-description" rows="7" cols="60"></textarea><br>
                        <input class="map-element-images" type="file" multiple><br><br>
                        <input class="map-element-submit" type="submit"/>
                    </div>
                </div>
            `
            return container
        }
        mapElementSearch(){
            var container = `
                <div class="form-container">
                    <input class="search-input" type="text" placeholder="Map Element Name" />
                    <br>
                    <input class="add-waterfall-submit" type="submit"/>
                    <div class="search-results"></div>
                </div>
            `
            return container
        }
        // Hut Templates
        hutMajorInfo(element){
            var container = document.createElement('div');
            container.innerHTML = `
                <div class='info-box-container'>
                    <div class='major-info-box-title'>${element.name}</div> 
                    ${ element.altitude ?`
                        <div class='info-box-attribute-label'>altitude: </div>
                        <div class='info-box-attribute-value'>${element.altitude}m</div>` : ``
                    }
                    ${ element.capacity ?`
                        <br>
                        <div class='info-box-attribute-label'>capacity: </div>
                        <div class='info-box-attribute-value'>${element.capacity}</div>` : ``
                    }
                </div>
                <div class='major-info-box-button'>
                    <img class='more-button' src='resources/icons/nav/arrow-sqeezed32h.png'>
                </div>
            `
            return container
        }
        hutShow(element){
            var score_image_name = "star_"+(element.score-(element.score%0.5)).toString().replace(".","_")
            console.log(score_image_name)
            console.log(app.resourcer.score[score_image_name])
            var container = `
                <div class="main-title">${element.general.name}</div>
                <hr>
                <div class="main-content">
                    <div class="w3-content w3-display-container">
                        ${element.images.map((item, i) => `
                            <img class="mySlides" src="${item}">
                        `).join('')}
                        
                        <button class="w3-button w3-black w3-display-left" onclick="plusDivs(-1)">&#10094;</button>
                        <button class="w3-button w3-black w3-display-right" onclick="plusDivs(1)">&#10095;</button>
                    </div>
                    <div class="elementScoreContainer">
                        <img class="elementScoreImage" src="${app.resourcer.score[score_image_name]}">
                    </div>
                    <hr>
                    <br>
                    ${element.general.altitude ?`
                        altitude:${element.general.altitude}<br>` : ``
                    }
                    ${element.general.capacity ?`
                        capacity:${element.general.capacity}<br>` : ``
                    }
                    lat:${element.general.latitude},lng:${element.general.longitude}<br><br> 
                    ${element.general.description}<br>
                </div>
            `
            return container
        }
        hutAddInputs(){
            var container = `
                <input class="add-hut-name" type="text" placeholder="Name*" />
                <br>
                <input class="add-hut-latitude" type="number" step="0.00001" placeholder="Latitude*" />
                <input class="add-hut-longitude" type="number" step="0.00001" placeholder="Longitude*" />
                <br>
                <input class="add-hut-altitude" type="number" placeholder="Altitude" />
                <br>
                <input class="add-hut-capacity" type="number" placeholder="Capacity" />
                <br>
                <input class="add-hut-submit" type="submit"/>
            `
            return container
        }
        // Cave Templates
        caveMajorInfo(element){
            var container = document.createElement('div');
            container.innerHTML = `
                <div class='info-box-container'>
                    <div class='major-info-box-title'>${element.name}</div> 
                    ${ element.depth ?`
                        <div class='info-box-attribute-label'>depth: </div>
                        <div class='info-box-attribute-value'>${element.depth}m</div>` : ``
                    }
                    ${ element.lenght ?`
                        <br>
                        <div class='info-box-attribute-label'>lenght: </div>
                        <div class='info-box-attribute-value'>${element.lenght}m</div>` : ``
                    }
                </div>
                <div class='major-info-box-button'>
                    <img class='more-button' src='resources/icons/nav/arrow-sqeezed32h.png'>
                </div>
            `
            return container
        }
        caveShow(element){
            var container = `
                <div class="main-title">${element.general.name}</div>
                <hr>
                <div class="main-content">
                    ${element.general.depth ?`
                        depth:${element.general.depth}<br>` : ``
                    }
                    ${element.general.lenght ?`
                        lenght:${element.general.lenght}<br>` : ``
                    }
                    lat:${element.general.latitude},lng:${element.general.longitude}<br> 
                    score:${element.score}<br>
                </div>
            `
            return container
        }
        caveAddInputs(){
            var container = `
                <input class="add-cave-name" type="text" placeholder="Name*" />
                <br>
                <input class="add-cave-latitude" type="number" step="0.00001" placeholder="Latitude*" />
                <input class="add-cave-longitude" type="number" step="0.00001" placeholder="Longitude*" />
                <br>
                <input class="add-cave-depth" type="number" placeholder="Depth" />
                <br>
                <input class="add-cave-length" type="number" placeholder="Length" />
                <br>
                <input class="add-cave-submit" type="submit"/>
            `
            return container
        }
        // Campsite Templates
        campsiteMajorInfo(element){
            var container = document.createElement('div');
            container.innerHTML = `
                <div class='info-box-container'>
                    <div class='major-info-box-title'>${element.name}</div> 
                </div>
                <div class='major-info-box-button'>
                    <img class='more-button' src='resources/icons/nav/arrow-sqeezed32h.png'>
                </div>
            `
            return container
        }
        campsiteShow(element){
            var container = `
                <div class="main-title">${element.general.name}</div>
                <hr>
                <div class="main-content">
                    lat:${element.general.latitude},lng:${element.general.longitude}<br> 
                    score:${element.score}<br>
                </div>
            `
            return container
        }
        campsiteAddInputs(){
            var container = `
                <input class="add-campsite-name" type="text" placeholder="Name*" />
                <br>
                <input class="add-campsite-latitude" type="number" step="0.00001" placeholder="Latitude*" />
                <input class="add-campsite-longitude" type="number" step="0.00001" placeholder="Longitude*" />
                <br>
                <input class="add-campsite-submit" type="submit"/>
            `
            return container
        }
        // Waterfall Templates
        waterfallMajorInfo(element){
            var container = document.createElement('div');
            container.innerHTML = `
                <div class='info-box-container'>
                    <div class='major-info-box-title'>${element.name}</div> 
                    ${ element.height ?`
                        <div class='info-box-attribute-label'>hight: </div>
                        <div class='info-box-attribute-value'>${element.height}m</div>` : ``
                    }
                </div>
                <div class='major-info-box-button'>
                    <img class='more-button' src='resources/icons/nav/arrow-sqeezed32h.png'>
                </div>
            `
            return container
        }
        waterfallShow(element){
            var container = `
                <div class="main-title">${element.general.name}</div>
                <hr>
                <div class="main-content">
                    ${element.general.height ?`
                        depth:${element.general.height}<br>` : ``
                    }
                    lat:${element.general.latitude},lng:${element.general.longitude}<br> 
                    score:${element.score}<br>
                </div>
            `
            return container
        }
        waterfallAddInputs(){
            var container = `
                <input class="add-waterfall-name" type="text" placeholder="Name*" />
                <br>
                <input class="add-waterfall-latitude" type="number" step="0.00001" placeholder="Latitude*" />
                <input class="add-waterfall-longitude" type="number" step="0.00001" placeholder="Longitude*" />
                <br>
                <input class="add-waterfall-height" type="number" placeholder="Height" />
                <br>
                <input class="add-waterfall-submit" type="submit"/>
            `
            return container
        }
        // Monastery Templates
        // Peak Templates
        // Path Templates
        pathMinorInfo(path){
            var container = document.createElement('div');
            container.innerHTML = `
                ${ path.time ?`
                    time:<b>${Math.floor(path.time/60)}h ${path.time%60}m</b>` : ``
                }
                ${ path.lenght ?`
                    <br>
                    lenght:<b>${path.lenght}km</b>` : ``
                }
            `
            return container
        }
        // Shared Templates
        sharedMinorInfo(element){
            var container = document.createElement('div');
            container.innerHTML = `
                <div class='info-box-container'>
                    <div class='minor-info-box-title'>${element.name}</div>
                </div>
            `
            return container
        }

    // STATIC PAGES
        missionPage(){
            return `
            <div class="main-title">Out Mission</div>
            <hr>
            <div class="main-content">
                <p>The big idea, well may be not that big, behind PineTree was to create 
                    a super interactive, amazingly user friendly and ultra intuitive, glorious map, 
                    of all interesting natural beuties, huts, mountain paths, monasteries 
                    end etc. and will hopefully make the lives of many hikers, mountaineers and 
                    other simple tourists around the world a little bit easier.
                </p>

                <p>For that purpose we are relying on your help a little bit, that is why everyone is
                    allowed and welcomed to use it freely, add new elements, write review and everything 
                    else that the site provides:).
                </p> 

                <p>If you feel the urge to contribute, please take a look at "How to Help" page</p>

                <p>Donations are of course, always welcomed with no exceptions :)</p>
            </div>
            `
        }
        teamPage(){
            return `
            <div class="main-title">The Team</div>
            <hr>
            <div class="main-content">
                <p>Based on the last headcount the PineTree team consists of 2 people a 
                    seagul and a small pine tree.
                </p>

                <p>Both <b>programmers</b> are higly trained, in multiple languages and software 
                    products, but are really not good at anything. They are around 30 yo with more 
                    than 30 years of experience, with the best companies in the IT industry
                </p>

                <p>The <b>seagul</b> was reacently promoted to head of Commerce, but we are happy
                    to see her leave on a maternal leave, as she has to take care of her 24 children. 
                    To be honest she was not that comited to the cause either way :)
                </p>

                <p>Last and definatly LEAST the <b>Pinetree</b> just sits there, growing, nothing 
                    more, however despite its lazy attidude towards work, we love it and I can't image 
                    how we would have reach this level without it 
                </p>
            </div>
            `
        }
        helpPage(){
            return `
                <div class="main-title">How to Help</div>
                <hr>
                <div class="main-content">
                <p>A lot of help is needed for the map to reach a glorious state. 
                    Unfortunatly at the moment we are less than 4 people working on 
                    the platform only in our spare time, so additional hands will be 
                    much appreciated. Also please keep in mind that this is a free 
                    comunity project so we can't offer any payments for the services 
                    you will provide, at least for now ;(</p>

                <p>Here are some of the fields that you can help us in:<br>
                <ul>
                    <li>
                        <p><b>Advertisment</b>: We would like to make the site 
                            more popular in order to get as much people as possible to 
                            use and contribute to the map. With this said any marketing 
                            strategist or social media gurus will be welcomed as currently 
                            the head of the Commerce department is literaly a seagul, a 
                            very inteligent one, but still a seagul</p>
                    </li>
                    <li>
                        <p><b>Map Information</b>: There are plenty of sights in this world 
                            that are still missing on the map so, if you have the time and 
                            the drive to help us fill the gaps, we will be more than 
                            gratefull</p>
                    </li>
                    <li>
                        <p><b>Programing</b>: We have a couple of ideas for additional tools 
                            for polling relevant data from other public website that will 
                            improve the state of PineTree. Sadly we have less than 3 programers 
                            working on the project and even thought we allow them to sleep in 
                            the basement for only two hours a day, this proves to be insufficient
                    </li>
                    <li> 
                        <p><b>Ideas</b>: If you have a good idea please let us know, using 
                            the contacts on the web site. I really hope that they will be 
                            interesting and that someone will read them.</p>
                    </li>
                    <li> 
                        <p><b>Donate</b>: If you feel like you are useless and cant help us 
                            with anything listed above, but have a huge sack of money, that 
                            you dont know what to do with, give us a should. We have a very 
                            friendly and talkative team that will confort your missery,
                            especially if you have a huge mantion on the sea which we can 
                            use from time to time :)</p>
                    </li>
                </ul>
                </p>
            `
        }
        donatePage(){
            return `
              <div class="main-title">Donations</div>
              <hr>
              <div class="main-content">
                <p> For the moment the whole project is ran on donations so every little drop
                helps the PineTree to grow and withstand the strong winds of life's tragical 
                obsticals, perplexive dramas and evade grim death, like the hero he is</p>

                <p>If you want to use the old ways of donating please use the visa form below
                  <br>
                    ---------------
                    | Visa Button |
                    ---------------
                </p>

                <p>If instead you are a futurist please use the addreses below:<br>
                <ul>
                  <li><b>Bitcoin</b>: address-btc</li>
                  <li><b>Ethereum</b>: address-eth</li>
                  <li><b>Ripple</b>: address-xrp</li>
                </ul>
                <p></p>
              </div>
            `
        }
        partnerPage(){
            return `
              <div class="main-title">Partners</div>
              <hr>
              <div class="main-content">
                <p> We have <b>0</b> partners so far but then again we are still a work 
                  in progress. </p>
                <p> It is common knowledge that the first client/partnes is the hardest to find,
                  so for those of you that are considering a partnership I can offer you the 
                  single, most valuable asset of the company, one tesla share.
                </p>
                <p>Our contacts are on the left, so if have already started salavating for that 
                incredible investment opportunity, feel free to reach out to us</p>
              </div>
            `
        }
        contactsPage(){
            return `
              <div class="main-title">Contacts</div>
              <hr>
              <div class="main-content">
                <p>
                  This is how you can reach us:
                  <ul>
                    <li><b>Email</b>: phone-number</li>
                    <li><b>Phone</b>: mail-address</li>
                  </ul>
                </p>
              </div>
            `
        }
}