let Gamestart = 2;
let Username = prompt("Wat is je naam?", "naam");
let gamestart2 = false;
const buttoncontainer = document.querySelector(".button-container");

document.getElementById('usrid').innerHTML = Username || "NoName"; 
const Buttongo = document.querySelector(".gobutton");

if (Buttongo) {
    Buttongo.onclick = function() { GO(); };
} 

function GO() {
    if (Gamestart == 2) {
        let right = 0,
        gomove = document.querySelector('.gobutton'),
        timerId = 0;

        timerId = setInterval(function() { 
            if (right++ > 700) {
                clearInterval(timerId); 
                gomove.innerText = "Restart";
                gamestart2 = true; 
            }
            gomove.style.right = right + "px";
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
    Gamestart = 1;

    if (gamestart2 === true) { 
        if (document.querySelector('.gobutton').innerText === "Restart") {
            const restartconfirm = confirm("Restart?");
            if (restartconfirm) {
                location.reload();
            }
        }
    }
}

function handleDifficulty(difficulty) {
    const usernameElement = document.getElementById('usrid');
    switch (difficulty) {
        case 'Easy':
            usernameElement.style.color = 'green';
            break;
        case 'Medium':
            usernameElement.style.color = 'yellow';
            break;
        case 'Hard':
            usernameElement.style.color = 'red';
            break;
    }

    const buttons = document.querySelectorAll('.centrebutton');
    buttons.forEach(button => {
        button.style.display = 'none'; // Hide the difficulty buttons
    });

    const newButtons = ['Hoger', 'Lager', 'Precies'];
    newButtons.forEach(buttonText => {
        const button = document.createElement('button');
        button.className = 'centrebutton';
        button.textContent = buttonText;
        buttoncontainer.appendChild(button);

        setTimeout(() => {
            button.classList.add('fade-in');
        }, 100);
    });
}