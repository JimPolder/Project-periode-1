//variabelen

let Username = prompt("What's your name?", "Name");
const buttoncontainer = document.querySelector(".button-container");
const hearts = document.querySelectorAll('.heart');
const healthbar = document.querySelector('.healthbar');
let currentHearts = hearts.length;
let diceVariable;
let targetNumber;
let diceDisplay;
let lastGuess;
let lastChoice;
let minRange;
let maxRange;
let winCounter = 0;

const header1 = document.querySelector(".titleheader")
const header2 = document.querySelector(".titleheader2")

document.querySelector('.usrclass').innerHTML = Username || "NoName"; 
const Buttongo = document.querySelector(".gobutton");
const chatLog = document.querySelector('.chat-log');
const winCounterDisplay = document.querySelector('.win-counter');
winCounterDisplay.style.display = "none"


//Begin game

Buttongo.addEventListener('click', function() { 
    Buttongo.style.display = 'none';
    header1.style.display = "none";
    header2.style.display = "none";
    winCounterDisplay.style.display = "inline"
    startGame();
});

function createRestartButton() {
    const restartButton = document.createElement('button');
    restartButton.innerText = "Restart";
    restartButton.className = "restart-button"; 
    restartButton.style.position = "fixed";
    restartButton.style.left = "10%"; 
    restartButton.style.bottom = "10px"; 
    restartButton.style.padding = "10px 20px"; 
    restartButton.style.fontSize = "16px"; 
    restartButton.style.border = "2px solid #777"; 
    restartButton.style.backgroundColor = "#700"; 
    restartButton.style.color = "#FFFFFF"; 
    restartButton.style.borderRadius = "5px"; 
    restartButton.style.cursor = "pointer"; 
    
    restartButton.addEventListener('click', function() {
        location.reload();
    });
    document.body.appendChild(restartButton);
}

function startGame() {
    backgroundmusic()
    const buttons = ['Easy', 'Medium', 'Hard'];
    buttoncontainer.innerHTML = ''; 

    buttons.forEach(buttonText => {
        const button = document.createElement('button');
        button.className = 'centrebutton';
        button.textContent = buttonText;
        buttoncontainer.appendChild(button);

        setTimeout(() => {
            button.classList.add('fade-in');
        }, 100);

        button.addEventListener('click', function() {
            handleDifficulty(buttonText);
        });
    });
}

function handleDifficulty(difficulty) {
    healthbar.style.display = 'flex';
    buttoncontainer.innerHTML = '';
    
    const usernameElement = document.querySelector('.usrclass');
    usernameElement.classList.remove('username-green', 'username-yellow', 'username-red');

    minRange = 1;
    switch (difficulty) {
        case 'Easy':
            maxRange = 20;
            usernameElement.classList.add('username-green');
            easysound()
            break;
        case 'Medium':
            maxRange = 50;
            usernameElement.classList.add('username-yellow');
            mediumsound()
            break;
        case 'Hard':
            maxRange = 100;
            usernameElement.classList.add('username-red');
            hardsound()
            break;
        default:
            maxRange = 20; 
    }

    setupGame(minRange, maxRange);
    createRestartButton();
}

function setupGame(min, max) {
    targetNumber = generateRandomNumber(min, max);
    diceVariable = generateRandomNumber(min, max);

    while (targetNumber === diceVariable) {
        targetNumber = generateRandomNumber(min, max);
    }

    if (diceDisplay) {
        diceDisplay.remove();
    }

    diceDisplay = document.createElement('div');
    diceDisplay.className = 'dice-display';
    diceDisplay.style.position = 'fixed';
    diceDisplay.style.top = '35%';
    diceDisplay.style.left = '50%';
    diceDisplay.style.transform = 'translate(-50%, -50%)';
    diceDisplay.innerText = `🎲 ${diceVariable}`;
    document.body.appendChild(diceDisplay);

    createActionButtons();
}

function createActionButtons() {
    const buttonNames = ['higher', 'lower', 'guess'];
    buttoncontainer.innerHTML = '';

    buttonNames.forEach(buttonText => {
        const button = document.createElement('button');
        button.className = 'centrebutton';
        button.textContent = buttonText;
        buttoncontainer.appendChild(button);

        setTimeout(() => {
            button.classList.add('fade-in');
        }, 100);

        button.addEventListener('click', function() {
            buttonText === 'guess' ? checkExactGuess() : checkResult(buttonText.toLowerCase());
        });
    });
}

//gameplay

function checkExactGuess() {
    const guess = prompt("What number do you think it is?");
    const message = document.createElement('div');

    if (guess !== null) {
        const guessedNumber = parseInt(guess, 10);
        if (!isNaN(guessedNumber) && guessedNumber >= minRange && guessedNumber <= maxRange) {
            lastGuess = guessedNumber;
            if (guessedNumber === targetNumber) {
                winCounter++;
                winCounterDisplay.innerText = `Winstreak: ${winCounter}`;

                
                winCounterDisplay.classList.remove('flash-green'); 
                void winCounterDisplay.offsetWidth; 
                winCounterDisplay.classList.add('flash-green'); 

                setTimeout(() => {
                    winCounterDisplay.classList.remove('flash-green');
                }, 2000);

                message.innerText = `Congratulations! You guessed it right with ${guessedNumber}! You have ${winCounter} wins!`;
                alert(message.innerText);
                message.style.color = "blue";
                chatLog.appendChild(message);
                restoreHearts();
                setupGame(minRange, maxRange);
                showConfetti();
                winsound();
            } else {
                currentHearts--;
                hearts[currentHearts].style.visibility = 'hidden';
                message.innerText = `Wrong! The correct number was not ${guessedNumber}. You lost a heart!`;
                message.style.color = "red";
                chatLog.appendChild(message);
                alert(message.innerText);
                flashScreen('red');
                guessound();
                notcorrect();
                checkGameOver();
            }
        } else {
            alert("Please enter a valid number within the range.");
        }
    }
    chatLog.scrollTop = chatLog.scrollHeight;
}

function restoreHearts() {
    currentHearts = hearts.length;
    hearts.forEach(heart => heart.style.visibility = 'visible');
}

function checkResult(choice) {
    const message = document.createElement('div');
    let isHigher = targetNumber > diceVariable;

    lastChoice = choice;

    if (choice === 'higher') {
        if (isHigher) {
            message.innerText = `Correct! The target number was higher than ${diceVariable}!`;
            message.style.color = "green"
            flashScreen('green');
            correct()
        } else {
            currentHearts--;
            hearts[currentHearts].style.visibility = 'hidden';
            message.innerText = `Wrong! The target number was lower than ${diceVariable}! You lost a heart!`;
            message.style.color = "red"
            flashScreen('red');
            notcorrect()
        }
    } else if (choice === 'lower') {
        if (!isHigher) {
            message.innerText = `Correct! The target number was lower than ${diceVariable}!`;
            message.style.color = "green"
            flashScreen('green');
            correct()
        } else {
            currentHearts--;
            hearts[currentHearts].style.visibility = 'hidden';
            message.style.color = "red"
            message.innerText = `Wrong! The target number was higher than ${diceVariable}! You lost a heart!`;
            flashScreen('red');
            notcorrect()
        }
    }

    chatLog.appendChild(message);
    checkGameOver();
    updateDiceDisplay();
    generateNewDice();
    chatLog.scrollTop = chatLog.scrollHeight;
}

function checkGameOver() {
    if (currentHearts <= 0) {
        alert("Game Over! No hearts left.");
        resetGame();
    }
}

function updateDiceDisplay() {
    if (diceDisplay) {
        diceDisplay.innerText = `🎲 ${diceVariable}`;
    }
}

function generateNewDice() {
    diceVariable = generateRandomNumber(minRange, maxRange);
    updateDiceDisplay();
}

function resetGame() {
    location.reload();
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//animations

function flashScreen(color) {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = 0;
    flash.style.left = 0;
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = color;
    flash.style.opacity = 0.7;
    flash.style.transition = 'opacity 0.5s';
    document.body.appendChild(flash);
    setTimeout(() => {
        flash.style.opacity = 0;
        setTimeout(() => flash.remove(), 500);
    }, 100);
}

function showConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const particles = [];

    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 5 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            speed: Math.random() * 3 + 1,
            direction: Math.random() < 0.5 ? Math.random() * Math.PI : Math.random() * Math.PI + Math.PI,
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
            ctx.fillStyle = p.color;
            ctx.fill();
            p.x += Math.cos(p.direction) * p.speed;
            p.y += Math.sin(p.direction) * p.speed;
            if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
                p.x = Math.random() * canvas.width;
                p.y = Math.random() * canvas.height;
            }
        });
        requestAnimationFrame(animate);
    }

    animate();
    setTimeout(() => {
        document.body.removeChild(canvas);
    }, 4000);
}