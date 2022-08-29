'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const dieEl = document.querySelector('.die');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions

let current, scores, playing, activePlayer;

const init = () => {
  dieEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  btnRoll.removeAttribute('disabled');
  btnHold.removeAttribute('disabled');
  current = 0;
  scores = [0, 0];
  playing = true;
  activePlayer = 0;
};

init();

const rndDie = () => Math.floor(Math.random() * 6) + 1;
const displayDie = num => {
  dieEl.classList.remove('hidden');
  dieEl.src = `dice-${num}.png`;
};
const switchPlayers = () => {
  current = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  activePlayer = Number(!activePlayer);
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

const displayScore = () =>
  (document.querySelector(`#current--${activePlayer}`).textContent = current);

const roll = () => {
  if (playing) {
    const die = rndDie();
    displayDie(die);
    if (die === 1) {
      current = 0;
      switchPlayers();
    } else {
      current += die;
    }
    displayScore();
  }
};
const hold = () => {
  if (playing) {
    scores[activePlayer] += current;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      dieEl.classList.add('hidden');
      btnRoll.setAttribute('disabled', 'true');
      btnHold.setAttribute('disabled', 'true');
      playing = false;
    } else {
      switchPlayers();
    }
  }
};

btnRoll.addEventListener('click', roll);
btnHold.addEventListener('click', hold);
btnNew.addEventListener('click', init);
