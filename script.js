'use strict';
document.addEventListener('contextmenu', e => e.preventDefault());

const dice = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn-roll');
const holdBtn = document.querySelector('.btn-hold');
const resetBtn = document.querySelector('.btn-reset');
const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');

const displayText = function (selector, message) {
  return document.getElementById(selector).textContent = message;
}

const random = function () { return Math.trunc(Math.random() * 6) + 1 };

// Generating a rolled dice random
const randomDice = function () {
  rollDice(random());
}

let activePlayer = 0;
let scoresArchive = 0;

// Rolling dice functionality
const rollDice = function (rolledDice) {

  dice.style.animation = 'rolling 1.5s';

  setTimeout(() => {

    switch (rolledDice) {
      case 1:
        dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
        break;

      case 2:
        dice.style.transform = 'rotateX(-90deg) rotateY(0deg)';
        break;

      case 3:
        dice.style.transform = 'rotateX(0deg) rotateY(90deg)';
        break;

      case 4:
        dice.style.transform = 'rotateX(0deg) rotateY(-90deg)';
        break;

      case 5:
        dice.style.transform = 'rotateX(90deg) rotateY(0deg)';
        break;

      case 6:
        dice.style.transform = 'rotateX(180deg) rotateY(0deg)';
        break;

      default:
        break;
    }

    dice.style.animation = 'none';

    // Check for rolled 1
    let activeSelector = `scoresArchive-${activePlayer}`;

    if (rolledDice !== 1) {
      scoresArchive += rolledDice;
      displayText(activeSelector, scoresArchive);
      // Switches player
    } else {
      scoresArchive = 0;
      displayText(activeSelector, scoresArchive);
      player0.classList.toggle('_active');
      player1.classList.toggle('_active');
      activePlayer = activePlayer === 0 ? 1 : 0;
    }

    rollBtn.classList.toggle('disabled');

  }, 1550);

}

rollBtn.addEventListener('click', function () {
  rollBtn.classList.toggle('disabled');
  randomDice();
});
