let Gamestart = 2;
let Username = prompt("Wat is je naam?", "naam");
let gamestart2 = false;
const buttoncontainer = document.querySelector(".button-container");
const hearts = document.querySelectorAll('.heart');
const healthbar = document.querySelector('.healthbar');
let currentHearts = hearts.length;
let diceVariable;
let randomVariable;

document.getElementById('usrid').innerHTML = Username || "NoName"; 
const Buttongo = document.querySelector(".gobutton");

Buttongo.onclick = function() { 
    moveGOButton(); 
};

function moveGOButton() {
    let left = 50;
    const gomove = document.querySelector('.gobutton');

    const timerId = setInterval(function() { 
        if (left <= 13) {
            clearInterval(timerId);
            gomove.innerText = "Restart";
            gomove.onclick = function() {
                location.reload();
            };
            gamestart2 = true; 
        }
        gomove.style.left = left + "%";
        left--; 
    }, 1);

    const buttons = ['Easy', 'Medium', 'Hard'];
    buttons.forEach(buttonText => {
        const button = document.createElement('button');
        button.className = 'centrebutton';
        button.textContent = buttonText;
        buttoncontainer.appendChild(button);

        setTimeout(() => {
            button.classList.add('fade-in');
        }, 100);

        button.onclick = function() {
            handleDifficulty(buttonText);
        };
    });
}

function handleDifficulty(difficulty) {
    const usernameElement = document.getElementById('usrid');
    healthbar.style.display = 'block';
    buttoncontainer.innerHTML = '';

    switch (difficulty) {
        case 'Easy':
            usernameElement.style.color = 'green';
            setupGame(1, 50);
            break;
        case 'Medium':
            usernameElement.style.color = 'yellow';
            setupGame(1, 100);
            break;
        case 'Hard':
            usernameElement.style.color = 'red';
            setupGame(1, 1000);
            break;
    }
}

function setupGame(min, max) {
    diceVariable = generateRandomNumber(min, max);
    do {
        randomVariable = generateRandomNumber(min, max);
    } while (Math.abs(randomVariable - diceVariable) < 15);

    const diceDisplay = document.createElement('div');
    diceDisplay.style.position = 'fixed';
    diceDisplay.style.top = '35%';
    diceDisplay.style.left = '50%';
    diceDisplay.style.transform = 'translate(-50%, -50%)';
    diceDisplay.style.fontSize = '48px';
    diceDisplay.innerText = `🎲 ${diceVariable}`;
    document.body.appendChild(diceDisplay);

    const hogerButton = document.createElement('button');
    hogerButton.className = 'centrebutton';
    hogerButton.textContent = 'Hoger';
    buttoncontainer.appendChild(hogerButton);

    const lagerButton = document.createElement('button');
    lagerButton.className = 'centrebutton';
    lagerButton.textContent = 'Lager';
    buttoncontainer.appendChild(lagerButton);

    const preciesButton = document.createElement('button');
    preciesButton.className = 'centrebutton';
    preciesButton.textContent = 'Precies';
    buttoncontainer.appendChild(preciesButton);

    hogerButton.onclick = function() {
        checkResult('hoger');
    };

    lagerButton.onclick = function() {
        checkResult('lager');
    };

    preciesButton.onclick = function() {
        checkResult('precies');
    };

    [hogerButton, lagerButton, preciesButton].forEach(button => {
        setTimeout(() => {
            button.classList.add('fade-in');
        }, 100);
    });
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkResult(choice) {
    const chatLog = document.getElementById('chatLog');
    const message = document.createElement('div');

    let isHigher = randomVariable > diceVariable;
    let isExact = randomVariable === diceVariable;

    if (choice === 'hoger') {
        if (isHigher) {
            message.innerText = `It was higher than ${diceVariable}!`;
        } else {
            currentHearts--;
            hearts[currentHearts].style.visibility = 'hidden';
            message.innerText = `You lost a heart!`;
        }
    } else if (choice === 'lager') {
        if (!isHigher) {
            message.innerText = `It was lower than ${diceVariable}!`;
        } else {
            currentHearts--;
            hearts[currentHearts].style.visibility = 'hidden';
            message.innerText = `You lost a heart!`;
        }
    } else if (choice === 'precies') {
        if (isExact) {
            message.innerText = `You guessed it right!`;
        } else {
            currentHearts--;
            hearts[currentHearts].style.visibility = 'hidden';
            message.innerText = `You lost a heart!`;
        }
    }

    chatLog.appendChild(message);

    if (currentHearts <= 0) {
        alert("Game Over! No hearts left.");
        location.reload();
    }
}

const chatLog = document.getElementById('chatLog');
chatLog.style.position = 'fixed';
chatLog.style.top = '65%';
chatLog.style.right = '20px';
chatLog.style.maxWidth = '200px';
chatLog.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
chatLog.style.border = '1px solid #333';
chatLog.style.padding = '10px';
chatLog.style.overflowY = 'auto';
chatLog.style.maxHeight = 'calc(100vh - 120px)';