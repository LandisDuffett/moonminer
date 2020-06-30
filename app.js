
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
            <div class="panel panel-default rounded bg-light panelmargin">
                <div class="panel-body p-3 text-center">
                    Testing Testing Testing
                <button class="btn btn-primary rounded mt-4" onclick="removeInstructions()">Start</button>
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
        ``
    document.getElementById("insertion").innerHTML = gameTemplate;
}

function closeScreen() {
    let closeTemplate = ""
    closeTemplate +=
        ``
    document.getElementById("insertion").innerHTML = closeTemplate;
}


welcomeScreen()