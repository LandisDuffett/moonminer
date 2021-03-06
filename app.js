let clickUpgrades = {
    pickaxes: {
        price: 100,
        quantity: 0,
        multiplier: 1
    },
    carts: {
        price: 500,
        quantity: 0,
        multiplier: 5
    }
};

let autoUpgrades = {
    rovers: {
        price: 1000,
        quantity: 0,
        multiplier: 20
    },
    mousebots: {
        price: 10000,
        quantity: 0,
        multiplier: 100
    },

};

let level = 0
let scoreboard = document.getElementById("here")
let directions = document.getElementById("direct")
let timerem = 180000;
let minrem = 0
let secrem = 0
let clockId = 0
let totmin = 0;
let totsec = 0;
let totch = 0;
let chgoal = 1000;
let pano = clickUpgrades.pickaxes.quantity;
let cano = clickUpgrades.carts.quantity;
let rono = autoUpgrades.rovers.quantity;
let mbno = autoUpgrades.mousebots.quantity;
let pamod = clickUpgrades.pickaxes.multiplier;
let camod = clickUpgrades.carts.multiplier;
let romod = autoUpgrades.rovers.multiplier;
let mbmod = autoUpgrades.mousebots.multiplier;
let cps = 0;
let tcm = 1;
let paprice = clickUpgrades.pickaxes.price;
let caprice = clickUpgrades.carts.price;
let roprice = autoUpgrades.rovers.price;
let mbprice = autoUpgrades.mousebots.price;
let collectionInterval = 0;
let currentPlayer = {}
let insert = document.getElementById("insertion")
let big = document.getElementById("large")

function welcomeScreen() {
    scoreboard.classList.add("hidden")
    directions.classList.add("hidden")
    let welcomeTemplate = ""
    welcomeTemplate +=
        /*html*/`
        <div class="row">
            <div class="panel panel-default rounded bg-light panelmargin">
                <div class="panel-body p-3 text-center">
                    <h4>Welcome to</h4>
                    <h1 style="font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif; color: teal">
                        <b>MOON MINER</b></h1>It turns out the moon IS made of cheese. Mice are the first ones there to mine
                    all the cheese they can. Your job is to direct their massive project. Enter your name and start clicking on
                    the moon to get the cheese. Upgrade equipment at the store to multiply your yield. Some of the equipment will
                    increase your cheese yield automatically. Don't get lazy, though. Keep an eye on the changing goal that you must meet every 3 minutes (which, for a mouse,
                        is like a day to us). Click the directions and pause the clock at any time. Happy cheese mining.
                    <br>
                        <button class="btn btn-primary rounded mt-4" onclick="nameScreen()">Start</button>
                </div>
            </div>
        </div>
        <div class="row justify-content-center align-items-center">
            <img class="moon" src="moon.png" alt="">
        </div>`
    document.getElementById("insertion").innerHTML = welcomeTemplate;
    document.getElementById("large").innerHTML = welcomeTemplate;
}

function getDirections() {
    clearInterval(clockId)
    clearInterval(collectionInterval)
    insert.classList.add("hidden")
    big.classList.add("hidden")
    directions.classList.remove("hidden")
}

function removeDirections() {
    if (level == 0) {
        insert.classList.remove("hidden")
        big.classList.remove("hidden")
        directions.classList.add("hidden")
        welcomeScreen()
    } else if (level == 1) {
        insert.classList.remove("hidden")
        big.classList.remove("hidden")
        directions.classList.add("hidden")
        nameScreen()
    } else {
        insert.classList.remove("hidden")
        big.classList.remove("hidden")
        directions.classList.add("hidden")
        startGame()
    }

}

function nameScreen() {
    level = 1
    let nameTemplate = ""
    nameTemplate += /*html*/ `
<div class="row justify-content-center align-items-center">
    <div class="col-12 col-md-8">
        <div class="panel panel-default rounded bg-light panelmargin">
            <div class="panel-body p-3 text-center">
                <div class="row justify-content-center m-1">
                    <form onsubmit="setPlayer(event)">
                        <div>
                            <label for="name">
                                <span>Player Name: </span></label>
                            <input type="text" name="playerName" required>
                             <span>
                            <button class="btn btn-primary ml-1 mb-2 sub" type="submit">Ok</button>
                        </span>
                        </div>
                    </form>
                </div>
                <div class="row justify-content-center mt-1">
                    <span class="pr-2"></span>
                    <span id="top-score"> </span>
                </div>
                
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row justify-content-center align-items-center">
    <img class="moon" src="moon.png" alt="">
</div>`
    document.getElementById("insertion").innerHTML = nameTemplate;
    document.getElementById("large").innerHTML = nameTemplate;
}

function startGame() {
    level = 2
    startInterval()
    setValues()
    if (secrem < 10) {
        document.getElementById("secrem").innerText = '0' + secrem.toString()
    } else {
        document.getElementById("secrem").innerText = secrem.toString()
    }
    document.getElementById("minrem").innerText = minrem.toString()
    startClock()
    gameScreen()
}

function setValues() {
    minrem = Math.floor(timerem / 60000)
    secrem = Math.floor((timerem % 60000) / 1000)
}

function startClock() {
    drawClock()
    clockId = setInterval(drawClock, 1000)
}

function drawClock() {
    setValues()
    if (secrem < 10) {
        document.getElementById("secrem").innerText = '0' + secrem.toString()
    } else {
        document.getElementById("secrem").innerText = secrem.toString()
    }
    document.getElementById("minrem").innerText = minrem.toString()
    statusCheck()
    timerem -= 1000
}

function statusCheck() {
    if (timerem == 0) {
        document.getElementById("minrem").innerText = "0"
        document.getElementById("secrem").innerText = "00"
        stopGame()
    } else if (totch >= chgoal) {
        timerem += 180000
        chgoal *= 3
    }
}

function gameScreen() {
    let playerNameElem = document.getElementById("currentPlayer")
    let gameTemplate = ""
    let gameTemplateLarge = ""
    gameTemplate += /*html*/ `
        <div class="row align-items-center justify-content-center statfont">
            <div class="col-4 pl-4">
                <div class="row text-center justify-content-center">
                    <p class="statfont mb-0">total cheese modifier:</p>
                    </div>
                    <div class="row justify-content-center">
                    <p class="numfont">${tcm}</p>
                </div>
                <div class="row text-center justify-content-center">
                    <p class="statfont mb-0">cheese per second:</p>
                    </div>
                    <div class="row justify-content-center">
                    <p class="numfont text-center"> ${cps}</p>
                </div>
            </div>
            <div class="col-4">
                <button class="bg-transparent border-0" onclick="mine()">

                    <img class="moon" src="moon.png" alt="">
        </button>
    </div>
                <div class="col-4 space-around">
                    <div class="row justify-content-center">
                        <p class="statfont mb-0 ml-2">cheese:</p>
                        </div>
                        <div class="row justify-content-center">
                        <p class="numfont cheese cheesebot">${totch}</p>
                    </div>
                    <div class="row justify-content-center">
                        <p class="statfont mb-0 ml-4">goal:</p>
                        </div>
                        <div class="row justify-content-center">
                        <p class="numfont cheese">${chgoal}</p>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center m-2">
                <div class="col-12">
                    <div class="panel panel-default rounded bg-light">
                        <div class="panel-body p-3 text-center">
                            <div class="row justify-content-center title">
                                <p class="storefont minmarg">STORE (UPGRADES)</p>
                            </div>
                            <div class="row storefont">
                                <div class="col-7">
                                    <div class="row justify-content-center">
                                        <span>
                                            <p class="minmarg mt-0">ITEM</p>
                                        </span>
                                    </div>
                                    <div class="row mb-2">
                                        <button class="btn btn-info rounded smallbutton pl-1" onclick="buyPickAxe()">
                                            <span class="tiny">
                                                <p>pick axe<img src="pick-axe.svg" class="svg3" alt="">+1</p>

                                </span>
                            </button>
                        </div>
                                        <div class="row mb-2">
                                            <button class="btn btn-info rounded smallbutton" onclick="buyCart()">
                                                <span class="tiny">
                                                    <p class="mb-0">cart<img src="kart.png" class="svg3" alt="">+5</p>

                                </span>
                            </button>

                        </div>
                                            <div class="row mb-2">
                                                <button class="btn btn-info rounded smallbutton" onclick="buyRover()">
                                                    <span class="tiny">
                                                        <p class="mb-0">rover<img src="rover.png" class="svg" alt="">+20</p>

                                </span>
                            </button>

                        </div>
                                                <div class="row mb-2">
                                                    <button class="btn btn-info rounded smallbutton pl-0 mr-1 mbot" onclick="buyMousebot()">
                                                        <span class="tiny">
                                                            <p class="mb-0">mousebot<img src="mbot.png" class="svg2" alt="">+100</p>

                                </span>
                            </button>

                        </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="row justify-content-center margleft">
                                                        <span>
                                                            <p class="mb-1">PRICE</p>
                                                        </span>
                                                    </div>
                                                    <div class="row justify-content-center">
                                                        <span>
                                                            <p class="storenum1">${paprice}</p>
                                                        </span>
                                                    </div>
                                                    <div class="row justify-content-center">
                                                        <span>
                                                            <p class="storenum2">${caprice}</p>
                                                        </span>
                                                    </div>
                                                    <div class="row justify-content-center">
                                                        <span>
                                                            <p class="storenum3">${roprice}</p>
                                                        </span>
                                                    </div>
                                                    <div class="row justify-content-center">
                                                        <span>
                                                            <p class="storenum4">${mbprice}</p>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row justify-content-center m-2">
                                <div class="col-12">
                                    <div class="panel panel-default rounded bg-light">
                                        <div class="panel-body p-3 text-center padleft">
                                            <div class="row justify-content-center title">
                                                <p class="storefont minmarg">INVENTORY</p>
                                            </div>
                                            <div class="row storefont">
                                                <div class="col-8">
                                                    <div class="row justify-content-between">
                                                        <span>
                                                            <p class="minmarg mt-0">ITEM</p>
                                                        </span>
                                                    </div>


                                                    <div class="row">
                                                        <span>
                                                            <p class="mb-0" >pick axes</p>
                                                        </span>
                                                    </div>
                                                    <div class="row">
                                                        <span>
                                                            <p class="mb-0">carts</p>
                                                        </span>
                                                    </div>
                                                    <div class="row">
                                                        <span>
                                                            <p class="mb-0">rovers</p>
                                                        </span>
                                                    </div>
                                                    <div class="row">
                                                        <span>
                                                            <p class="mb-0">mousebots</p>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="row justify-content-center">
                                                        <span class="pr-3">
                                                            <p class="minmarg mt-0">QUANTITY</p>
                                                        </span>
                                                    </div>
                                                    <div class="row justify-content-center">
                                                        <span>
                                                            <p class="mb-0">${pano}</p>
                                                        </span>
                                                    </div>
                                                    <div class="row justify-content-center">
                                                        <span>
                                                            <p class="mb-0">${cano}</p>
                                                        </span>
                                                    </div>
                                                    <div class="row justify-content-center">
                                                        <span>
                                                            <p class="mb-0">${rono}</p>
                                                        </span>
                                                    </div>
                                                    <div class="row justify-content-center">
                                                        <span>
                                                            <p class="mb-0">${mbno}</p>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
    gameTemplateLarge += /*html*/ `
        <div class="row">
            <div class="col-4">
                <div class="panel panel-default rounded bg-light minhigh">
                    <div class="panel-body p-3 text-center">
                        <div class="row justify-content-center title">
                            <p class="storefont minmarg">STORE (UPGRADES)</p>
                        </div>
                        <div class="row storefont">
                            <div class="col-7">
                                <div class="row justify-content-center">
                                    <span>
                                        <p class="minmarg mt-0">ITEM</p>
                                    </span>
                                </div>
                                <div class="row mb-2">
                                    <button class="btn btn-info rounded smallbutton pl-1" onclick="buyPickAxe()">
                                        <span class="tiny">
                                            <p class="pb-1">pick axe<img src="pick-axe.svg" class="svg3" alt="">+1</p>

                                </span>
                            </button>
                        </div>
                                    <div class="row mb-2">
                                        <button class="btn btn-info rounded smallbutton" onclick="buyCart()">
                                            <span class="tiny">
                                                <p class="pb-1">cart<img src="kart.png" class="svg3" alt="">+5</p>

                                </span>
                            </button>

                        </div>
                                        <div class="row mb-2">
                                            <button class="btn btn-info rounded smallbutton" onclick="buyRover()">
                                                <span class="tiny">
                                                    <p class="mb-0">rover<img src="rover.png" class="svg" alt="">+20</p>

                                </span>
                            </button>

                        </div>
                                            <div class="row mb-2">
                                                <button class="btn btn-info rounded smallbutton pl-0 mr-1 mbot" onclick="buyMousebot()">
                                                    <span class="tiny">
                                                        <p class="mb-0" style="font-size: smaller">mousebot<img src="mbot.png" class="svg2" alt=""><span class="font-size: smaller">+ 100</span></p>

                                </span>
                            </button>

                        </div>
                                            </div>
                                            <div class="col-4">
                                                <div class="row justify-content-center margleft">
                                                    <span>
                                                        <p class="mb-1">PRICE</p>
                                                    </span>
                                                </div>
                                                <div class="row justify-content-center">
                                                    <span>
                                                        <p class="storenum1">${paprice}</p>
                                                    </span>
                                                </div>
                                                <div class="row justify-content-center">
                                                    <span>
                                                        <p class="storenum2">${caprice}</p>
                                                    </span>
                                                </div>
                                                <div class="row justify-content-center">
                                                    <span>
                                                        <p class="storenum3">${roprice}</p>
                                                    </span>
                                                </div>
                                                <div class="row justify-content-center">
                                                    <span>
                                                        <p class="storenum4">${mbprice}</p>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="row justify-content-center">
                                    <button class="bg-transparent border-0 mt-4" onclick="mine()">

                                        <img class="moon" src="moon.png" alt="">
            </button>
        </div>
                                    <div class="row">
                                        <div class="col-3">
                                            <div class="row justify-content-left">
                                                <p class="statfont">cheese:</p>
                                                </div>
                                                <div class="row justify-content-left">
                                                <p class="numfont">${totch}</p>
                                            </div>
                                        </div>
                                        <div class="col-3">
                                            <div class="row justify-content-left">
                                                <p class="statfont">goal:</p>
                                            </div>
                                            <div class="row justify-content-left">
                                                <p class="numfont">${chgoal}</p>
                                            </div>
                                        </div>
                                        <div class="col-3">
                                            <div class="row justify-content-left">
                                                <p class="statfont mb-0">total cheese modifier:</p>
                                            </div>
                                            <div class="row justify-content-left">
                                                <p class="numfont">${tcm}</p>
                                            </div>
                                        </div>
                                        <div class="col-3">
                                            <div class="row justify-content-left">
                                                <p class="statfont mb-0">cheese per second:</p>
                                            </div>
                                            <div class="row justify-content-left">
                                                <p class="numfont"> ${cps}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="panel panel-default rounded bg-light minhigh">
                                        <div class="panel-body p-3 text-center padleft">
                                            <div class="row justify-content-center title">
                                                <p class="storefont minmarg">INVENTORY</p>
                                            </div>
                                            <div class="row storefont">
                                                <div class="col-8">
                                                    <div class="row justify-content-between">
                                                        <span>
                                                            <p class="minmarg mt-0">ITEM</p>
                                                        </span>
                                                    </div>


                                                    <div class="row">
                                                        <span>
                                                            <p class="mb-0">pick axes</p>
                                                        </span>
                                                    </div>
                                                    <div class="row">
                                                        <span>
                                                            <p class="mb-0">carts</p>
                                                        </span>
                                                    </div>
                                                    <div class="row">
                                                        <span>
                                                            <p class="mb-0">rovers</p>
                                                        </span>
                                                    </div>
                                                    <div class="row">
                                                        <span>
                                                            <p class="mb-0">mousebots</p>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="row justify-content-center">
                                                        <span class="pr-3">
                                                            <p class="minmarg mt-0">QUANTITY</p>
                                                        </span>
                                                    </div>
                                                    <div class="row justify-content-center">
                                                        <span>
                                                            <p class="mb-0">${pano}</p>
                                                        </span>
                                                    </div>
                                                    <div class="row justify-content-center">
                                                        <span>
                                                            <p class="mb-0">${cano}</p>
                                                        </span>
                                                    </div>
                                                    <div class="row justify-content-center">
                                                        <span>
                                                            <p class="mb-0">${rono}</p>
                                                        </span>
                                                    </div>
                                                    <div class="row justify-content-center">
                                                        <span>
                                                            <p class="mb-0">${mbno}</p>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
    perSecond()
    calcMultiplier()
    playerNameElem.innerText = currentPlayer.name
    document.getElementById("insertion").innerHTML = gameTemplate;
    document.getElementById("large").innerHTML = gameTemplateLarge;
}

function mine() {
    if ((pano) && (!cano)) {
        totch += 1 + pano
    } else if ((cano) && (!pano)) {
        totch += 1 + (cano * 5)
    } else if ((cano) && (pano)) {
        totch += 1 + pano + (cano * 5)
    } else {
        totch++
    }
    gameScreen();
}

function buyPickAxe() {
    if (totch >= paprice) {
        totch -= paprice;
        clickUpgrades.pickaxes.quantity = pano + 1;
        pano = clickUpgrades.pickaxes.quantity;
        if (pano == 1) {
            clickUpgrades.pickaxes.price = Math.round(paprice * 1.5);
            paprice = clickUpgrades.pickaxes.price;
            gameScreen();
        } else {
            clickUpgrades.pickaxes.price = paprice * pano;
            paprice = clickUpgrades.pickaxes.price;
            gameScreen();
        }
    }
}

function buyCart() {
    if (totch >= caprice) {
        totch -= caprice;
        clickUpgrades.carts.quantity = cano + 1;
        cano = clickUpgrades.carts.quantity;
        if (cano == 1) {
            clickUpgrades.carts.price = Math.round(caprice * 1.5);
            caprice = clickUpgrades.carts.price;
            gameScreen();
        } else {
            clickUpgrades.carts.price = caprice * cano;
            caprice = clickUpgrades.carts.price;
            gameScreen();
        }
    }
}

function buyRover() {
    if (totch >= roprice) {
        totch -= roprice;
        autoUpgrades.mousebots.quantity = rono + 1;
        rono = autoUpgrades.mousebots.quantity;
        if (rono == 1) {
            autoUpgrades.rovers.price = Math.round(roprice * 1.5);
            roprice = autoUpgrades.rovers.price;
            gameScreen();
        } else {
            autoUpgrades.rovers.price = roprice * rono;
            roprice = autoUpgrades.rovers.price;
            gameScreen();
        }
    }
}

function buyMousebot() {
    if (totch >= mbprice) {
        totch -= mbprice;
        autoUpgrades.mousebots.quantity = mbno + 1;
        mbno = autoUpgrades.mousebots.quantity;
        if (mbno == 1) {
            autoUpgrades.mousebots.price = Math.round(mbprice * 1.5);
            mbprice = autoUpgrades.mousebots.price;
            gameScreen();
        } else {
            autoUpgrades.mousebots.price = mbprice * mbno;
            mbprice = autoUpgrades.mousebots.price;
            gameScreen();
        }
    }
}

function startInterval() {
    collectionInterval = setInterval(autoMine, 3000);
}

function autoMine() {
    if ((rono) && (!mbno)) {
        totch += (rono * 20)
    } else if ((mbno) && (!rono)) {
        totch += (mbno * 100)
    } else if ((mbno) && (rono)) {
        totch += (rono * 20) + (mbno * 100)
    }
    gameScreen()
}


function perSecond() {
    cps = Math.round(((rono * romod) + (mbno * mbmod)) / 3)
}

function calcMultiplier() {
    tcm = (pano * pamod) + (cano * camod)
}

let players = []
loadPlayers()

function setPlayer(event) {
    event.preventDefault()
    let playerScoreElem = document.getElementById("top-score")
    let form = event.target
    let playerName = form.playerName.value
    currentPlayer = players.find(player => player.name == playerName)
    if (!currentPlayer) {
        currentPlayer = { name: playerName, topScore: 0 }
        players.push(currentPlayer)
        savePlayers()
    }
    playerScoreElem.innerHTML = currentPlayer.topScore
    form.reset()
    let nameTemplate = ""
    nameTemplate += /*html*/ `
<div class="row justify-content-center align-items-center">
    <div class="col-12 col-md-8">
        <div class="panel panel-default rounded bg-light panelmargin">
            <div class="panel-body p-3 text-center" style="font-family: 'Notable', sans-serif;">
                <div class="row justify-content-center m-1">
                    <span class="pr-2">Player Name: </span><span>${currentPlayer.name}</span>
                </div>
                <div class="row justify-content-center mt-1">
                    <span class="pr-2">Your High Score: </span>
                    <span>${currentPlayer.topScore}</span>
                </div>
                <div class="row justify-content-center mt-2">
                    <button class="btn btn-primary rounded" onclick="startGame()">Play</button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row justify-content-center align-items-center">
    <img class="moon" src="moon.png" alt="">
</div>`

    document.getElementById("insertion").innerHTML = nameTemplate;
    document.getElementById("large").innerHTML = nameTemplate;
}

function stopGame() {
    directions.classList.add("hidden")
    clearInterval(collectionInterval)
    clearInterval(clockId)
    document.getElementById("minrem").innerText = "0"
    document.getElementById("secrem").innerText = "00"
    if (totch > currentPlayer.topScore) {
        currentPlayer.topScore = totch
        savePlayers()
    }
    insert.classList.add("hidden")
    big.classList.add("hidden")
    totch = 0
    closeScreen()
}

function savePlayers() {
    window.localStorage.setItem("players", JSON.stringify(players))
}

function loadPlayers() {
    let playersData = JSON.parse(window.localStorage.getItem("players"))
    if (playersData) {
        players = playersData
    }
}


function closeScreen() {
    let highScoreTemplate = ""
    players.sort((p1, p2) => p2.topScore - p1.topScore)
    let users = players.slice(0, 10)
    users.forEach(player => {
        highScoreTemplate +=
            `<div class="row justify-content-center highscorefont">
            <div class="col-4 ml-4">
            <p>${player.name}</p>
            </div>
            <div class="col-4 mr-4">
            <p>${player.topScore}</p>
            </div>
        </div>`
    })
    scoreboard.classList.remove("hidden")
    document.getElementById("players").innerHTML = highScoreTemplate;
}


welcomeScreen()
