'use strict';

document.addEventListener('contextmenu', e => e.preventDefault());

const random = function () { return Math.trunc(Math.random() * 6) + 1 };

// Generating a rolled dice random
const randomDice = function () {
  return rollDice(random());
}

const queryNode = function (node) {
  return document.querySelector(node);
}

let activePlayer = 0;
let scoresArchive = 0;
let scoresSelector = `#scoresHold-${activePlayer}`;
let archiveSelector = `#scoresArchive-${activePlayer}`;

const scores = [0, 0];
const dice = queryNode('.dice');
const rollBtn = queryNode('.btn-roll');
const holdBtn = queryNode('.btn-hold');
const resetBtn = queryNode('.btn-reset');
const player0 = queryNode('.player-0');
const player1 = queryNode('.player-1');

const toggleClass = function (node, className) {
  node.classList.toggle(className);
}

const displayText = function (node, message) {
  return queryNode(node).textContent = message;
}

const insertAfter = function (refNode, newNode) {
  return refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
}

const switchPlayer = function () {
  scoresArchive = 0;
  displayText(archiveSelector, scoresArchive);
  toggleClass(player0, '_active');
  toggleClass(player1, '_active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  scoresSelector = `#scoresHold-${activePlayer}`;
  archiveSelector = `#scoresArchive-${activePlayer}`;
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

    // Check for rolled 1
    if (rolledDice !== 1) {
      scoresArchive += rolledDice;
      displayText(archiveSelector, scoresArchive);
      // Switches player
    } else { switchPlayer() }

    toggleClass(rollBtn, 'disabled');
    toggleClass(holdBtn, 'disabled');

  }, 1550);

}

rollBtn.addEventListener('click', function () {
  toggleClass(rollBtn, 'disabled');
  toggleClass(holdBtn, 'disabled');
  randomDice();
});

holdBtn.addEventListener('click', function () {
  scores[activePlayer] += scoresArchive;
  displayText(scoresSelector, scores[activePlayer]);
  if (scores[activePlayer] >= 100) {
    scoresArchive = 0;
    displayText(archiveSelector, scoresArchive);
    toggleClass(rollBtn, 'disabled');
    toggleClass(holdBtn, 'disabled');
    const trophyNode = document.createElement('p');
    trophyNode.classList.add('score');
    trophyNode.innerHTML = '🏆';
    const scoresNode = queryNode(scoresSelector);
    insertAfter(scoresNode, trophyNode);
    const winnerNode = queryNode(`.player-${activePlayer}`);
    toggleClass(winnerNode, '_winner');
    dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
  } else { switchPlayer(); }
});