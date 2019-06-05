
document.querySelector(".left-nav-hamburger").addEventListener("click", function() {
  var nav = document.querySelector(".left-nav").style.zIndex = 30
});

document.querySelector(".left-nav-back").addEventListener("click", function() {
  document.querySelector(".left-nav").style.zIndex = 5
});

document.querySelector(".left-nav-mission").addEventListener("click", function(){
    mainWindow = app.getMainWindowContainer()
    mainWindow.innerHTML = `
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
        else that the site provides:).</p> 

        <p>If you feel the urge to contribute, please take a look at "How to Help" page</p>

        <p>Donations are of course, always welcomed with no exceptions :)</p>
      </div>
    `
    app.showMainWindow()
})
document.querySelector(".left-nav-team").addEventListener("click", function(){
    mainWindow = app.getMainWindowContainer()
    mainWindow.innerHTML = `
      <div class="main-title">The Team</div>
      <hr>
      <div class="main-content">
        <p>Based on the last headcount the PineTree team consists of 2 people a 
          seagul and a small pine tree.</p>

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
    app.showMainWindow()
})
document.querySelector(".left-nav-help").addEventListener("click", function(){
    mainWindow = app.getMainWindowContainer()
    mainWindow.innerHTML = `
      <div class="main-title">How to Help</div>
      <hr>
      <div class="main-content">
        <p>A lot of help is needed for the map to reach a glorious state. 
        Unfortunatly at the moment we are less than 4 people working on the platform 
        only in our spare time, so additional hands will be much appreciated. 
        Also please keep in mind that this is a free comunity project so we can't offer 
        any payments for the services you will provide, at least for now ;(</p>

        <p>Here are some of the fields that you can help us in:<br>
        <ul>
          <li>
            <p><b>Advertisment</b>: We would like to make the site 
              more popular in order to get as much people as possible to use and 
              contribute to the map. With this said any marketing strategist or 
              social media gurus will be welcomed as currently the head of the Commerce
              department is literaly a seagul, a very inteligent one, but still a seagul</p>
          </li>
          <li>
            <p><b>Map Information</b>: There are plenty of sights in this world that are 
              still missing on the map so, if you have the time and the drive to help 
              us fill the gaps, we will be more than gratefull</p>
          </li>
          <li>
            <p><b>Programing</b>: We have a couple of ideas for additional tools for polling 
              relevant data from other public website that will improve the state 
              of PineTree. Sadly we have less than 3 programers working on the project 
              and even thought we allow them to sleep in the basement for only two hours 
              a day, this proves to be insufficient
          </li>
          <li> 
            <p><b>Ideas</b>: If you have a good idea please let us know, using the contacts on the web site.
              I really hope that they will be interesting and that someone will read them.</p>
          </li>
          <li> 
            <p><b>Donate</b>: If you feel like you are useless and cant help us with anything listed above, 
              but have a huge sack of money, that you dont know what to do with, give us a should.
              We have a very friendly and talkative team that will confort your missery,
              especially if you have a huge mantion on the sea which we can use from time to time :)</p>
          </li>
        </ul>
        </p>
    `
    app.showMainWindow()
})
document.querySelector(".left-nav-donate").addEventListener("click", function(){
    mainWindow = app.getMainWindowContainer()
    mainWindow.innerHTML = `
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
    app.showMainWindow()
})
document.querySelector(".left-nav-partners").addEventListener("click", function(){
    mainWindow = app.getMainWindowContainer()
    mainWindow.innerHTML = `
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
    app.showMainWindow()
})

document.querySelector(".left-nav-contacts").addEventListener("click", function(){
    mainWindow = app.getMainWindowContainer()
    mainWindow.innerHTML = `
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
    app.showMainWindow()
})