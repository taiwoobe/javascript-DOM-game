/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer, gamePlaying, lastDice;

// var diceDOM = document.querySelector('.dice');

onPageInit();


// Reading values from the DOM using the querySelector() method.
// var scoreZero = document.querySelector('#score-0').textContent;
// console.log(scoreZero);


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
    if (gamePlaying) {
        // Generating a random number for our dice. 
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
    
        // Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
    
        // Update the round score iff dice rolled is not 1. 

        if (dice1 !== 1 && dice2 !== 1){
            // Add dice score to roundscore
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
    
        } else {
            nextPlayer();
        }
        // if (dice === 6 && lastDice === 6) {
        //     // Player looses score.
        //     score[activePlayer] = 0; 
        //     document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
        //     nextPlayer();
        // } else if (dice !== 1){
        //     // Add dice score to roundscore
        //     roundScore += dice;
        //     document.querySelector('#current-' + activePlayer).textContent = roundScore;
    
        // } else {
        //     nextPlayer();
        // }
        // lastDice = dice;
    } 

});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add current/round score to the Global Score 
        score[activePlayer] += roundScore;
    
        // Update the UI to effect the new score 
        document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];

        // get the value of the winning score from the input field.
        var finalScore = document.querySelector('.final-score').value;

        // set a default value if nothing is set as the winning score
        var winningScore;
        if (finalScore) {
            winningScore = finalScore;
        } else {
            winningScore = 100;
        }
        // Check if player has won the game
        if (score[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!!!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', onPageInit);


// function that calls the next player.
function nextPlayer() {
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
    document.querySelector('.player-1-panel').classList.toggle('active');

    // Hiding the image once a user rolls 1 so the next user can start. 
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}


// Function to be called when the page starts up or is restarted. 
function onPageInit() {
    score = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    // Modifying the CSS attribute of the DOM using the querySelector() method. This can be set directly in CSS though. 
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    // Setting all values to 0 on page load.
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Setting player names back to default. 
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    // remove extra css from players
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
