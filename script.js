'use strict';
document.addEventListener('contextmenu', e => e.preventDefault());

const dice = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn-roll');
const holdBtn = document.querySelector('.btn-hold');
const resetBtn = document.querySelector('.btn-reset');
const scoresHold0 = document.getElementById('scoresHold-0');
const scoresHold1 = document.getElementById('scoresHold-1');
const scoresArchive0 = document.getElementById('scoresArchive-0');
const scoresArchive1 = document.getElementById('scoresArchive-1');

const random = function () { return Math.trunc(Math.random() * 6) + 1 };

// Generating a rolled dice random
const randomDice = function () {
  rollDice(random());
}

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

  }, 1550);

}

rollBtn.addEventListener('click', randomDice);
