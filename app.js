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

let timerem = 0;
let totmin = 0;
let totsec = 0;
let totch = 990;
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

function welcomeScreen() {
    let welcomeTemplate = ""
    welcomeTemplate +=
        `<div class="row">
            <div class="panel panel-default rounded bg-light panelmargin">
                <div class="panel-body p-3 text-center">
                    <h4>Welcome to</h4>
                    <h1 style="font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif; color: teal">
                        <b>MOON MINER</b></h1>It turns out the moon IS made of cheese. Mice are the first ones there to mine
                    all the cheese they can. Your job is to direct their massive project. Enter your name and start clicking on
                    the moon to get the cheese. Upgrade equipment at the store to multiply your yield. Some of the equipment will
                    increase your cheese yield automatically. Don't get lazy, though. Keep any eye on the changing goal that you must meet every 3 minutes (which, for a mouse,
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
}

function nameScreen() {
    let nameTemplate = ""
    nameTemplate +=
        `<div class="row justify-content-center align-items-center">
            <div class="col-12 col-md-8">
                <div class="panel panel-default rounded bg-light panelmargin">
                    <div class="panel-body p-3 text-center" style="font-family: 'Notable', sans-serif;">
                        <div class="row justify-content-center m-1">
                        <form id="player-form" onsubmit="setPlayer(event)">
                            <label for="name">
                                <span>Player Name: </span></label>
                        </div>
                        <div class="row justify-content-center m-1">
                            <input type="text" name="playerName" required>
                                <button class="btn btn-primary sub" type="submit">Ok</button>
                            </form>
                        </div>
                          <div class="row justify-content-center mt-1">
                            <span class="pr-2">Your High Score: </span>
                            <span id="top-score">0</span>
                        </div>
                        <div class="row justify-content-center mt-2">
                            <button class="btn btn-primary rounded" onclick="gameScreen()">Play</button>
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center align-items-center">
            <img class="moon" src="moon.png" alt="">
        </div>`
    document.getElementById("insertion").innerHTML = nameTemplate;
}

function gameScreen() {
    let gameTemplate = ""
    gameTemplate +=
        `<div class="row align-items-center justify-content-center statfont">
            <div class="col-4">
                    <p>Cheese per second: ${cps}</p>
            </div>
            <div class="col-4">
                <button class="bg-transparent border-0" onclick="mine()">
                    <img class="moon" src="moon.png" alt="">
        </button>
    </div>
                <div class="col-4">
                        <p>Total cheese modifier: ${tcm}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-8">
                    <div class="panel panel-default rounded bg-light">
                        <div class="panel-body p-3 text-center">
                            <div class="row justify content center">
                                <p>STORE (UPGRADES)</p>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <div class="row">
                                        <span>
                                            <p>item</p>
                                        </span>
                                    </div>
                                    <div class="row">
                                        <button class="btn btn-light rounded" onclick="buyPickAxe()">
                                            <span>
                                                <p>pick axe</p>
                                            </span>
                                            <span><img src="pick-axe.svg" alt="">
                                </span>
                            </button>
                        </div>
                                        <div class="row">
                                            <button class="btn btn-light rounded" onclick="buyCart()">
                                                <span>
                                                    <p>cart</p>
                                                </span>
                                                <span><img src="https://img.icons8.com/android/24/000000/shopping-cart.png" alt="">
                                </span>
                            </button>
                        </div>
                                            <div class="row">
                                                <button class="btn btn-light rounded" onclick="buyRover()">
                                                    <span>
                                                        <p>rover</p>
                                                    </span>
                                                    <span><img src="rover.png" alt="">
                                </span>
                            </button>
                        </div>
                                                <div class="row">
                                                    <button class="btn btn-light rounded" onclick="buyMousebot()">
                                                        <span>
                                                            <p>mousebot</p>
                                                        </span>
                                                        <span><img src="mbot.png" alt="">
                                </span>
                            </button>
                        </div>
                                                </div>
                                                <div class="col-3">
                                                    <div class="row">
                                                        <span>
                                                            <p>price</p>
                                                        </span>
                                                    </div>
                                                    <div class="row">
                                                        <span>
                                                            <p>${paprice}</p>
                                                        </span>
                                                    </div>
                                                    <div class="row">
                                                        <span>
                                                            <p>${caprice}</p>
                                                        </span>
                                                    </div>
                                                    <div class="row">
                                                        <span>
                                                            <p>${roprice}</p>
                                                        </span>
                                                    </div>
                                                    <div class="row">
                                                        <span>
                                                            <p>${mbprice}</p>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="col-3">
                                                    <div class="row">
                                                        <span>
                                                            <p>multiplier</p>
                                                        </span>
                                                    </div>
                                                    <div class="row">
                                                        <span>
                                                            <p>${pamod}</p>
                                                        </span>
                                                    </div>
                                                    <div class="row">
                                                        <span>
                                                            <p>${camod}</p>
                                                        </span>
                                                    </div>
                                                    <div class="row">
                                                        <span>
                                                            <p>${romod}</p>
                                                        </span>
                                                    </div>
                                                    <div class="row">
                                                        <span>
                                                            <p>${mbmod}</p>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="panel panel-default rounded bg-light">
                                        <div class="panel-body p-3 text-center">
                                            <div class="row justify-content-center">
                                                <p>INVENTORY</p>
                                            </div>
                                            <div class="row">
                                                <div class="col-8">
                                                    <div class="row">
                                                        <span>
                                                            <p>item</p>
                                                        </span>
                                                    </div>
                                                    <div class="row">
                                                        <span>
                                                            <p>pick axes</p>
                                                        </span>
                                                    </div>
                                                    <div class="row">
                                                        <span>
                                                            <p>carts</p>
                                                        </span>
                                                    </div>
                                                    <div class="row">
                                                        <span>
                                                            <p>rovers</p>
                                                        </span>
                                                    </div>
                                                    <div class="row">
                                                        <span>
                                                            <p>mousebots</p>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="row">
                                                        <span>
                                                            <p>quantity</p>
                                                        </span>
                                                    </div>
                                                    <div class="row">
                                                        <span>
                                                            <p>${pano}</p>
                                                        </span>
                                                    </div>
                                                    <div class="row">
                                                        <span>
                                                            <p>${cano}</p>
                                                        </span>
                                                    </div>
                                                    <div class="row">
                                                        <span>
                                                            <p>${rono}</p>
                                                        </span>
                                                    </div>
                                                    <div class="row">
                                                        <span>
                                                            <p>${mbno}</p>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
    document.getElementById("insertion").innerHTML = gameTemplate;
}

function closeScreen() {
    let closeTemplate = ""
    closeTemplate +=
        ``
    document.getElementById("insertion").innerHTML = closeTemplate;
}


welcomeScreen()