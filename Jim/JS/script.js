let Username = prompt("Wat is je naam?", "naam");
const buttoncontainer = document.querySelector(".button-container");
const hearts = document.querySelectorAll('.heart');
const healthbar = document.querySelector('.healthbar');
let currentHearts = hearts.length;
let diceVariable;
let targetNumber; // New variable for the number to guess
let diceDisplay;
let lastGuess;
let lastChoice;
let minRange;
let maxRange;

document.getElementById('usrid').innerHTML = Username || "NoName"; 
const Buttongo = document.querySelector(".gobutton");

Buttongo.onclick = function() { 
    startGame(); 
};

function startGame() {
    const gomove = document.querySelector('.gobutton');
    gomove.style.position = "fixed"; 
    gomove.style.right = "20px"; 
    gomove.style.top = "20px"; 
    gomove.innerText = "Restart";
    gomove.onclick = function() {
        location.reload();
    };

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

        button.onclick = function() {
            handleDifficulty(buttonText);
        };
    });
}

function handleDifficulty(difficulty) {
    healthbar.style.display = 'flex';
    buttoncontainer.innerHTML = '';

    minRange = 1;
    switch (difficulty) {
        case 'Easy':
            maxRange = 20;
            break;
        case 'Medium':
            maxRange = 50;
            break;
        case 'Hard':
            maxRange = 100;
            break;
        default:
            maxRange = 20; 
    }

    setupGame(minRange, maxRange);
}

function setupGame(min, max) {
    // Generate the target number and the initial dice variable
    targetNumber = generateRandomNumber(min, max);
    diceVariable = generateRandomNumber(min, max);

    // Ensure targetNumber is different from diceVariable
    while (targetNumber === diceVariable) {
        targetNumber = generateRandomNumber(min, max);
    }

    // Display the initial dice number
    if (diceDisplay) {
        diceDisplay.remove();
    }

    diceDisplay = document.createElement('div');
    diceDisplay.style.position = 'fixed';
    diceDisplay.style.top = '35%';
    diceDisplay.style.left = '50%';
    diceDisplay.style.transform = 'translate(-50%, -50%)';
    diceDisplay.style.fontSize = '48px';
    diceDisplay.innerText = `🎲 ${diceVariable}`;
    document.body.appendChild(diceDisplay);

    createActionButtons();
}

function createActionButtons() {
    const buttonNames = ['Hoger', 'Lager', 'Precies'];
    buttoncontainer.innerHTML = ''; // Clear any previous buttons

    buttonNames.forEach(buttonText => {
        const button = document.createElement('button');
        button.className = 'centrebutton';
        button.textContent = buttonText;
        buttoncontainer.appendChild(button);

        setTimeout(() => {
            button.classList.add('fade-in');
        }, 100);

        button.onclick = function() {
            buttonText === 'Precies' ? checkExactGuess() : checkResult(buttonText.toLowerCase());
        };
    });
}

function checkExactGuess() {
    const guess = prompt("What number do you think it is?");
    if (guess !== null) {
        const guessedNumber = parseInt(guess, 10);
        if (!isNaN(guessedNumber) && guessedNumber >= minRange && guessedNumber <= maxRange) {
            lastGuess = guessedNumber;
            if (guessedNumber === targetNumber) {
                alert("Congratulations! You guessed it right!");
                resetGame();
            } else {
                currentHearts--;
                hearts[currentHearts].style.visibility = 'hidden';
                alert(`Wrong! The correct number was ${targetNumber}. You lost a heart!`);
                checkGameOver();
            }
        } else {
            alert("Please enter a valid number within the range.");
        }
    }
}

function checkResult(choice) {
    const chatLog = document.getElementById('chatLog');
    const message = document.createElement('div');

    // Check if the player's choice is correct based on the targetNumber
    let isHigher = targetNumber > diceVariable; // Determine if the target is higher than the current diceVariable

    lastChoice = choice;

    if (choice === 'hoger') {
        if (isHigher) {
            message.innerText = `Correct! The target number was higher than ${diceVariable}!`;
        } else {
            currentHearts--;
            hearts[currentHearts].style.visibility = 'hidden';
            message.innerText = `Wrong! The target number was lower than ${diceVariable}! You lost a heart!`;
        }
    } else if (choice === 'lager') {
        if (!isHigher) {
            message.innerText = `Correct! The target number was lower than ${diceVariable}!`;
        } else {
            currentHearts--;
            hearts[currentHearts].style.visibility = 'hidden';
            message.innerText = `Wrong! The target number was higher than ${diceVariable}! You lost a heart!`;
        }
    }

    chatLog.appendChild(message);
    checkGameOver(); // Check if the game is over
    updateDiceDisplay(); // Update the dice display
    generateNewDice(); // Generate a new dice variable for the next round
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
    // Generate a new dice number for the next round
    diceVariable = generateRandomNumber(minRange, maxRange);
    updateDiceDisplay(); // Update the displayed dice number
}

function resetGame() {
    location.reload();
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}