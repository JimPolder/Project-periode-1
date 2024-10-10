let Username = prompt("Wat is je naam?", "naam");
const buttoncontainer = document.querySelector(".button-container");
const hearts = document.querySelectorAll('.heart');
const healthbar = document.querySelector('.healthbar');
let currentHearts = hearts.length;
let diceVariable;
let targetNumber; // Variable for the number to guess
let diceDisplay;
let lastGuess;
let lastChoice;
let minRange;
let maxRange;

document.getElementById('usrid').innerHTML = Username || "NoName"; 
const Buttongo = document.querySelector(".gobutton");

Buttongo.onclick = function() { 
    // Hide the GO button
    Buttongo.style.display = 'none';
    
    // Start the game
    startGame();
};

function createRestartButton() {
    const restartButton = document.createElement('button');
    restartButton.innerText = "Restart";
    restartButton.className = "restart-button"; // Use a specific class for styling
    restartButton.style.position = "fixed";
    restartButton.style.left = "10%"; // Position slightly off the left
    restartButton.style.bottom = "10px"; // Position slightly above the bottom
    restartButton.style.padding = "10px 20px"; // Match padding of the GO button
    restartButton.style.fontSize = "16px"; // Match font size of the GO button
    restartButton.style.border = "2px solid #777"; // Grey border
    restartButton.style.backgroundColor = "#700"; // Dark red background
    restartButton.style.color = "#FFFFFF"; // White text
    restartButton.style.borderRadius = "5px"; // Rounded corners
    restartButton.style.cursor = "pointer"; // Pointer cursor on hover
    
    restartButton.onclick = function() {
        location.reload(); // Reloads the game
    };
    document.body.appendChild(restartButton);
}

function startGame() {
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
    
    // Remove any previous username animation classes
    const usernameElement = document.getElementById('usrid');
    usernameElement.classList.remove('username-green', 'username-yellow', 'username-red');

    minRange = 1;
    switch (difficulty) {
        case 'Easy':
            maxRange = 20;
            usernameElement.classList.add('username-green'); // Add green pulsing
            break;
        case 'Medium':
            maxRange = 50;
            usernameElement.classList.add('username-yellow'); // Add yellow pulsing
            break;
        case 'Hard':
            maxRange = 100;
            usernameElement.classList.add('username-red'); // Add red pulsing
            break;
        default:
            maxRange = 20; 
    }

    setupGame(minRange, maxRange);
    
    // Create the Restart button when a difficulty is chosen
    createRestartButton();
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