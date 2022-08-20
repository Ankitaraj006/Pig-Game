'use strict';

//Both works the same way
//Selecting elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting condintions
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active'); //because by default player 1 was active
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing === true) {
    //1. Generating a randon dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3. Check for rolled 1

    if (dice !== 1) {
      //If not 1, add the dice to Current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //current0El.textContent = currentScore;  //Old method of one by one player implemented
    } else {
      //If 1, switch to next player
      switchPlayer();
    }
  }
});

//Hold Button
btnHold.addEventListener('click', function () {
  if (playing === true) {
    console.log(scores[activePlayer]);
    //1. Add the current score to active player's score
    // Adding the currentScore to score
    scores[activePlayer] = scores[activePlayer] + currentScore;
    //scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if the player's score is >=100
    if (scores[activePlayer] >= 10) {
      //Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      //Removing the default background color i.e., by removing the player--active class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

//New Game Button
btnNew.addEventListener('click', function () {
  init();
});
