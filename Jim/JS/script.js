let Gamestart = 2;
let Username = prompt("Wat is je naam?", "naam");
let gamestart2 = false;
const buttoncontainer = document.querySelector(".button-container");
const hearts = document.querySelectorAll('.heart');
const healthbar = document.querySelector('.healthbar'); // Select the health bar
let currentHearts = hearts.length;
let diceVariable;
let randomVariable;

document.getElementById('usrid').innerHTML = Username || "NoName"; 
const Buttongo = document.querySelector(".gobutton");

// Start moving the GO button to the left when clicked
Buttongo.onclick = function() { 
    moveGOButton(); 
};

// Function to move the button to the left
function moveGOButton() {
    let left = 50; // Start from the center (50% left)
    const gomove = document.querySelector('.gobutton');

    // Move button to the left
    const timerId = setInterval(function() { 
        if (left <= 13) { // Stop when it reaches 10% from the left
            clearInterval(timerId); 
            gomove.innerText = "Restart"; // Change text to "Restart"
            gomove.onclick = function() {
                location.reload(); // Reload the page when clicked
            };
            gamestart2 = true; 
        }
        gomove.style.left = left + "%"; // Move to the left
        left--; // Decrement left position
    }, 1);

    // Show difficulty buttons after GO button is clicked
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
    
    // Show the health bar once a difficulty is chosen
    healthbar.style.display = 'block';

    // Clear existing buttons
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

    // Display the dice emoji and number in the center above the buttons
    const diceDisplay = document.createElement('div');
    diceDisplay.style.position = 'fixed';
    diceDisplay.style.top = '35%'; // Adjust top position to place it above buttons
    diceDisplay.style.left = '50%';
    diceDisplay.style.transform = 'translate(-50%, -50%)';
    diceDisplay.style.fontSize = '48px'; // Set font size
    diceDisplay.innerText = `🎲 ${diceVariable}`; // Use dice emoji with the number
    document.body.appendChild(diceDisplay);

    // Create "Hoger" button
    const hogerButton = document.createElement('button');
    hogerButton.className = 'centrebutton';
    hogerButton.textContent = 'Hoger';
    buttoncontainer.appendChild(hogerButton);

    // Create "Lager" button
    const lagerButton = document.createElement('button');
    lagerButton.className = 'centrebutton';
    lagerButton.textContent = 'Lager';
    buttoncontainer.appendChild(lagerButton);

    // Create "Precies" button
    const preciesButton = document.createElement('button');
    preciesButton.className = 'centrebutton';
    preciesButton.textContent = 'Precies';
    buttoncontainer.appendChild(preciesButton);

    // Add event listeners for the new buttons
    hogerButton.onclick = function() {
        checkResult('hoger');
    };

    lagerButton.onclick = function() {
        checkResult('lager');
    };

    preciesButton.onclick = function() {
        checkResult('precies');
    };

    // Fade in buttons
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
            hearts[currentHearts].style.visibility = 'hidden'; // Hide the heart
            message.innerText = `You lost a heart!`;
        }
    } else if (choice === 'lager') {
        if (!isHigher) {
            message.innerText = `It was lower than ${diceVariable}!`;
        } else {
            currentHearts--;
            hearts[currentHearts].style.visibility = 'hidden'; // Hide the heart
            message.innerText = `You lost a heart!`;
        }
    } else if (choice === 'precies') {
        if (isExact) {
            message.innerText = `You guessed it right!`;
        } else {
            currentHearts--;
            hearts[currentHearts].style.visibility = 'hidden'; // Hide the heart
            message.innerText = `You lost a heart!`;
        }
    }

    chatLog.appendChild(message);

    // Check if player is out of hearts
    if (currentHearts <= 0) {
        alert("Game Over! No hearts left.");
        location.reload(); // Restart the game
    }
}

// Move the chat log down about 5%
const chatLog = document.getElementById('chatLog');
chatLog.style.position = 'fixed';
chatLog.style.top = '65%'; // Move down by about 5%
chatLog.style.right = '20px';
chatLog.style.maxWidth = '200px';
chatLog.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
chatLog.style.border = '1px solid #333';
chatLog.style.padding = '10px';
chatLog.style.overflowY = 'auto';
chatLog.style.maxHeight = 'calc(100vh - 120px)'; // Adjust height based on other elements