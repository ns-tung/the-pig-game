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

const toggleClass = function (node, className) {
  return node.classList.toggle(className);
}

const removeClass = function (node, className) {
  return node.classList.remove(className);
}

const displayText = function (node, message) {
  return queryNode(node).textContent = message;
}

let scores = [0, 0];
let trophy = false;
let activePlayer = 0;
let scoresArchive = 0;
let scoresSelector = `#scoresHold-${activePlayer}`;
let archiveSelector = `#scoresArchive-${activePlayer}`;

const dice = queryNode('.dice');
const rollBtn = queryNode('.btn-roll');
const holdBtn = queryNode('.btn-hold');
const resetBtn = queryNode('.btn-reset');
const player0 = queryNode('.player-0');
const player1 = queryNode('.player-1');

const winningScore = function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (urlParams.get('wins') && Number(urlParams.get('wins')) >= 9) {
    return Number(urlParams.get('wins'));
  } else {
    window.location = '/?wins=99';
    return 99;
  }
}

const initGames = function () {
  removeClass(rollBtn, 'disabled');
  removeClass(holdBtn, 'disabled');
  scores = [0, 0];
  scoresArchive = 0;
  if (activePlayer === 0) {
    removeClass(player0, '_winner');
  } else {
    activePlayer = 0;
    removeClass(player1, '_winner');
    removeClass(player1, '_active');
    scoresSelector = `#scoresHold-${activePlayer}`;
    archiveSelector = `#scoresArchive-${activePlayer}`;
  }
  if (trophy) {
    queryNode('.trophy').remove();
    trophy = false;
  }
  dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
  player0.classList.add('_active');
  displayText('.wins', winningScore());
  displayText('#name-0', 'Player 1');
  displayText('#name-1', 'Player 2');
  displayText('#scoresHold-0', 0);
  displayText('#scoresHold-1', 0);
  displayText('#scoresArchive-0', 0);
  displayText('#scoresArchive-1', 0);
}

initGames();

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
    toggleClass(resetBtn, 'disabled');

  }, 1550);

}

rollBtn.addEventListener('click', function () {
  toggleClass(rollBtn, 'disabled');
  toggleClass(holdBtn, 'disabled');
  toggleClass(resetBtn, 'disabled');
  randomDice();
});

holdBtn.addEventListener('click', function () {
  scores[activePlayer] += scoresArchive;
  displayText(scoresSelector, scores[activePlayer]);
  if (scores[activePlayer] >= winningScore()) {
    scoresArchive = 0;
    displayText(archiveSelector, scoresArchive);
    displayText(`#name-${activePlayer}`, 'Winner!');
    toggleClass(rollBtn, 'disabled');
    toggleClass(holdBtn, 'disabled');
    trophy = true;
    const trophyNode = document.createElement('p');
    trophyNode.classList.add('trophy');
    trophyNode.innerHTML = '🏆';
    const scoresNode = queryNode(scoresSelector);
    insertAfter(scoresNode, trophyNode);
    const winnerNode = queryNode(`.player-${activePlayer}`);
    toggleClass(winnerNode, '_winner');
  } else { switchPlayer(); }
});

resetBtn.addEventListener('click', initGames);