//go sound

Buttongo.addEventListener("click", Gosound)

function Gosound(){
    let soundvar = new Audio("../AUDIO/queststart.mp3"); 
    soundvar.play();
}

function correct(){
    let soundvar = new Audio("../AUDIO/right.mp3"); 
    soundvar.play();
}

function notcorrect(){
    let soundvar = new Audio("../AUDIO/wrong.mp3"); 
    soundvar.play();
}

function winsound(){
    let soundvar = new Audio("../AUDIO/win.mp3"); 
    soundvar.play();
}

function guessound(){
    let soundvar = new Audio("../AUDIO/guess.mp3"); 
    soundvar.play();
}

function easysound(){
    let soundvar = new Audio("../AUDIO/easy.mp3"); 
    soundvar.play();
}

function mediumsound(){
    let soundvar = new Audio("../AUDIO/medium.mp3"); 
    soundvar.play();
}

function hardsound(){
    let soundvar = new Audio("../AUDIO/hard.mp3"); 
    soundvar.play();
}


function backgroundmusic(){
     let bgsoundvar = new Audio("../AUDIO/bgmusic.mp3"); 
     bgsoundvar.volume = 0.3
    bgsoundvar.play();
}
