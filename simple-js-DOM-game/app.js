/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer;

score = [0,0];
roundScore = 0;
activePlayer = 0;


// document.querySelector('#current-' + activePlayer).textContent = dice;


// Reading values from the DOM using the querySelector() method.
var scoreZero = document.querySelector('#score-0').textContent;
console.log(scoreZero);

// Modifying the CSS attribute of the DOM using the querySelector() method. This can be set directly in CSS though. 
document.querySelector('.dice').style.display = 'none';


//
document.getElementById('score-0').textContent = '0'
document.getElementById('score-1').textContent = '0'
document.getElementById('current-0').textContent = '0'
document.getElementById('current-1').textContent = '0'

// Function that is called once the roll button is cliked.
// function btnRollClicked() {
//    Do something here
// }

// Getting the button that performs the roll dice function.

// The below code shows how to use a callback function in the addEventListener method. 
// The callback function is basically a function that we dont call ourselves but allow another function to call it for us.

// document.querySelector('.btn-roll').addEventListener('click', btnRollClicked);

// We are making use of an anonymous function in the below code. 
//An anonymous function is a function that doesnt have a name and cannot be reused outside of its scope. 

document.querySelector('.btn-roll').addEventListener('click', function() {
    // Generating a random number for our dice. 
    var dice = Math.floor(Math.random() * 6) + 1;
    console.log(dice);

    // Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // Update the round score iff dice rolled is not 1. 
    if (dice !== 1){
        // Add dice score to roundscore
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;

    } else {
        // Terminate current player and move to Next Player.
        // To do that, we need to get the active player first and then switch it using the tenary operator. 
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        // Remove and Add CSS classes to the active and inactive player 

        // document.querySelector('.player-0-panel').classList.remove('active');
        // document.querySelector('.player-1-panel').classList.add('active');

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-0-panel').classList.toggle('active');

        // Hiding the image once a user rolls 1 so the next user can start. 
        diceDOM.style.display = 'none';

    }
});
