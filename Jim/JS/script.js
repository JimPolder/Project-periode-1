let Gamestart = false
let Username = prompt("Wat is je naam?", "naam");
const buttoncontainer = document.querySelector(".button-container")
  

document.getElementById('usrid').innerHTML = Username || "NoName"; 
const Buttongo = document.querySelector(".gobutton");

if (Buttongo) {
  Buttongo.onclick = function() { GO(); };

  
} 

function GO() {
    if (Gamestart == false){
      let right = 0,
      gomove = document.querySelector('.gobutton'),
      timerId = 0;

      timerId = setInterval( function() { 
      if( right++ > 750 ) {
          clearInterval( timerId ); 
        }
      gomove.style.right = right + "px";
}, 5 );
    }
    //buttons
    const buttons = ['Button 1', 'Button 2', 'Button 3'];

  buttons.forEach(buttonText => {
    const button = document.createElement('button');
    button.className = 'centrebutton';
    button.textContent = buttonText;
    
    buttoncontainer.appendChild(button);
});
    Gamestart = true

 }


//start game
if(Gamestart == true){




}