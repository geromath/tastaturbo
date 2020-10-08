import { state } from './gameState.js';
import { tasks } from './content.js';
import { playIntroSound } from './sound.js';
import { progressAnimation } from './animation.js';

const imgSource = '../img/';
let taskNumber = parseInt(location.hash.slice(1));

const task = tasks[taskNumber - 1];

if (taskNumber < 10) {
  taskNumber = '0' + taskNumber;
}

function initTask(sign) {
  if (sign) {
    document.getElementById('sign-left-column').classList.remove('hidden');
    document.getElementById('blind-left-column').classList.add('hidden');

    document.getElementById('ss-video').src =
      'vid/tastaturbo-' + taskNumber + '.mp4';
  } else {
    document.getElementById('sign-left-column').classList.add('hidden');
    document.getElementById('blind-left-column').classList.remove('hidden');
  }
  document.getElementById('start-tt-figurine').src =
    imgSource + 'tastaturbo-' + taskNumber + '.png';

  if (state.langValue === 'Nb') {
    document.getElementById('intro-text-blind').innerHTML = task.introNb;
    document.getElementById('intro-text-sign').innerHTML = task.introNb;
  } else {
    document.getElementById('intro-text-blind').innerHTML = task.introNn;
    document.getElementById('intro-text-sign').innerHTML = task.introNn;
  }

  document.getElementById('tt-figurine').src =
    imgSource + 'tastaturbo-' + taskNumber + '.png';
  document.getElementById('tt-background').src =
    imgSource + 'tastaturbo-bakgrunn-' + taskNumber + '.png';
  document.getElementById('end-tt-figurine').src =
    imgSource + 'tastaturbo-' + taskNumber + '.png';
}

const leftKeys = [
  'q',
  'a',
  'z',
  '1',

  'w',
  's',
  'x',
  '2',

  'e',
  'd',
  'c',
  '3',

  'r',
  't',
  'f',
  'g',
  'v',
  'b',
  '4',
  '5',
];

const hand = {
  leftPinky: ['q', 'a', 'z', '1'],
  leftRing: ['w', 's', 'x', '2'],
  leftLong: ['e', 'd', 'c', '3'],
  leftPoint: ['r', 't', 'f', 'g', 'v', 'b', '4', '5'],

  rightPoint: ['y', 'u', 'h', 'j', 'n', 'm', '6', '7'],
  rightLong: ['8', 'i', 'k'],
  rightRing: ['9', 'o', 'l'],
  rightPinky: ['0', 'p', 'ø', 'å', 'æ'],
};
function startUITask() {
  // Hiding the start page
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('main-screen').classList.remove('hidden');
  document.getElementById('input-field').focus();

  if (parseInt(location.hash.slice(1)) === 6) {
    document.getElementById('tt-figurine').style.width = '60%';
  }

  let t = tasks[parseInt(location.hash.slice(1)) - 1].task[0];
  if (t.length === 1) {
    updateLetterDisplay();
  } else {
    updateWordDisplay();
  }

  currentKeyHighlight();
  progressAnimation();
}

function updateLetterDisplay() {
  cleanSlate();
  document.getElementById('word-current-letter').classList.add('hidden');

  let t = tasks[parseInt(location.hash.slice(1)) - 1].task[state.currentLetter];
  if (leftKeys.includes(t)) {
    document.getElementById('left-letter').innerHTML = t;
  } else {
    document.getElementById('right-letter').innerHTML = t;
  }
}

let functionalWords = [
  'comma',
  'dash',
  'dot',
  'exclamation',
  'question',
  'quote',
  'paren-left',
  'paren-right',
  'hash',

  'slash',
  'equals',
  'star',
  'colon',
  'plus',
];

function updateWordDisplay() {
  cleanSlate();
  document.getElementById('word-current-letter').classList.remove('remove');

  let w = tasks[parseInt(location.hash.slice(1)) - 1].task[state.currentLetter];
  if (functionalWords.includes(w)) {
    if (w === 'comma') {
      document.getElementById('word-current-letter').innerHTML = ',';
    } else if (w === 'dash') {
      document.getElementById('word-current-letter').innerHTML = '-';
    } else if (w === 'exclamation') {
      document.getElementById('word-current-letter').innerHTML = '!';
    } else if (w === 'question') {
      document.getElementById('word-current-letter').innerHTML = '?';
    } else if (w === 'quote') {
      document.getElementById('word-current-letter').innerHTML = '"';
    } else if (w === 'paren-left') {
      document.getElementById('word-current-letter').innerHTML = '(';
    } else if (w === 'paren-right') {
      document.getElementById('word-current-letter').innerHTML = ')';
    } else if (w === 'hash') {
      document.getElementById('word-current-letter').innerHTML = '#';
    } else if (w === 'slash') {
      document.getElementById('word-current-letter').innerHTML = '/';
    } else if (w === 'equals') {
      document.getElementById('word-current-letter').innerHTML = '=';
    } else if (w === 'star') {
      document.getElementById('word-current-letter').innerHTML = '*';
    } else if (w === 'colon') {
      document.getElementById('word-current-letter').innerHTML = ':';
    } else if (w === 'plus') {
      document.getElementById('word-current-letter').innerHTML = '+';
    } else {
      document.getElementById('word-current-letter').innerHTML = '.';
    }
    return;
  }
  if (Number.isInteger(w)) {
    if (w < 10) {
      document.getElementById('word-current-letter').innerHTML = w;
    } else {
      let temp = w.toString();
      if (state.currentWordLetter === 0) {
        document.getElementById('word-current-letter').innerHTML = temp[0];
        document.getElementById('word-next-letter').innerHTML = temp[1];
      } else {
        document.getElementById('word-previous-letter').innerHTML = temp[0];
        document.getElementById('word-current-letter').innerHTML = temp[1];
      }
    }
    return;
  }
  if (state.currentWordLetter === 0) {
    document.getElementById('word-current-letter').innerHTML = w[0];
    document.getElementById('word-next-letter').innerHTML = w.slice(
      1,
      w.length
    );
  } else {
    document.getElementById('word-previous-letter').innerHTML = w.slice(
      0,
      state.currentWordLetter
    );
    document.getElementById('word-current-letter').innerHTML =
      w[state.currentWordLetter];
    document.getElementById('word-next-letter').innerHTML = w.slice(
      state.currentWordLetter + 1,
      w.length
    );
  }
}

function cleanSlate() {
  document.getElementById('word-previous-letter').innerHTML = '';
  document.getElementById('word-current-letter').innerHTML = '';
  document.getElementById('word-next-letter').innerHTML = '';
  document.getElementById('right-letter').innerHTML = '';
  document.getElementById('left-letter').innerHTML = '';
}

const numbers = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];
let highlighted;
function currentKeyHighlight() {
  if (highlighted) {
    highlighted.classList.remove('keyboard-blink');
  }

  let current =
    tasks[parseInt(location.hash.slice(1)) - 1].task[state.currentLetter];
  if (current.length === 1 || functionalWords.includes(current)) {
    highlighted = document.querySelector('.' + current);
    setHighlightColor(current);
  } else if (Number.isInteger(current)) {
    if (current < 10) {
      highlighted = document.querySelector('.' + numbers[current]);
    } else {
      let temp = current.toString();
      highlighted = document.querySelector(
        '.' + numbers[temp[state.currentWordLetter]]
      );
    }
  } else {
    if (current[state.currentWordLetter] === ' ') {
      highlighted = document.querySelector('.space');
    } else {
      highlighted = document.querySelector(
        '.' + current[state.currentWordLetter]
      );
    }
    setHighlightColor(current[state.currentWordLetter]);
  }
  highlighted.classList.add('keyboard-blink');
}

function blinkCurrentKey() {
  let current =
    tasks[parseInt(location.hash.slice(1)) - 1].task[state.currentLetter];
  if (current.length === 1) {
    if (leftKeys.includes(current)) {
      document.getElementById('left-letter').classList.add('letter-blink');
      setTimeout(function () {
        document.getElementById('left-letter').classList.remove('letter-blink');
      }, 400);
    } else {
      document.getElementById('right-letter').classList.add('letter-blink');
      setTimeout(function () {
        document
          .getElementById('right-letter')
          .classList.remove('letter-blink');
      }, 400);
    }
  } else {
    if (current[state.currentWordLetter] === ' ') {
      document
        .getElementById('word-current-letter')
        .classList.add('letter-blink--space');
      setTimeout(function () {
        document
          .getElementById('word-current-letter')
          .classList.remove('letter-blink--space');
      }, 400);
    }
    document
      .getElementById('word-current-letter')
      .classList.add('letter-blink');
    setTimeout(function () {
      document
        .getElementById('word-current-letter')
        .classList.remove('letter-blink');
    }, 400);
  }
}

function setHighlightColor(key) {
  let color = '#ffffff';
  if (hand.leftPinky.includes(key)) {
    color = '#0000ff';
  } else if (hand.leftRing.includes(key)) {
    color = '#ff0000';
  } else if (hand.leftLong.includes(key)) {
    color = '#ffff00';
  } else if (hand.leftPoint.includes(key)) {
    color = '#00ff00';
  } else if (hand.rightPoint.includes(key)) {
    color = '#00ff00';
  } else if (hand.rightLong.includes(key)) {
    color = '#ffff00';
  } else if (hand.rightRing.includes(key)) {
    color = '#ff0000';
  } else if (hand.rightPinky.includes(key)) {
    color = '#0000ff';
  }

  document.documentElement.style.setProperty('--highlight-color', color);
}

function updateTimeDisplay() {
  document.documentElement.style.setProperty(
    '--timer',
    (state.time / state.startTime) * 100 + '%'
  );
}

function endTask(victory) {
  document.getElementById('end-screen').classList.remove('hidden');
  document.getElementById('main-screen').classList.add('hidden');

  let t = tasks[parseInt(location.hash.slice(1)) - 1];

  if (state.langValue === 'Nb') {
    if (victory) {
      document.getElementById('es-text').innerHTML = t.successNb;

      document.getElementById('left-button').innerHTML = 'Tilbake';
      document.getElementById('right-button').innerHTML = 'Neste oppgave';
    } else {
      document.getElementById('es-text').innerHTML = t.failureNb;

      document.getElementById('left-button').innerHTML = 'Tilbake';
      document.getElementById('right-button').innerHTML = 'Prøv igjen';
    }
  } else {
    if (victory) {
      document.getElementById('es-text').innerHTML = t.successNn;

      document.getElementById('left-button').innerHTML = 'Tilbake';
      document.getElementById('right-button').innerHTML = 'Neste oppgåve';
    } else {
      document.getElementById('es-text').innerHTML = t.failureNn;

      document.getElementById('left-button').innerHTML = 'Tilbake';
      document.getElementById('right-button').innerHTML = 'Prøv igjen';
    }
  }
  if (victory) {
    document
      .getElementById('left-button')
      .addEventListener('click', function () {
        location = '../';
      });
    document
      .getElementById('right-button')
      .addEventListener('click', function () {
        location = '../task#' + (state.lection + 2);
      });
  } else {
    document
      .getElementById('left-button')
      .addEventListener('click', function () {
        location = '../';
      });
    document
      .getElementById('right-button')
      .addEventListener('click', function () {
        location.reload();
      });
  }
}

document
  .getElementById('ss-play-button-1')
  .addEventListener('click', function (e) {
    if (state.introPlaying) {
      document.getElementById('instant-audio').pause();
      state.introPlaying = false;
    } else {
      state.introPlaying = true;
      document.getElementById('instant-audio').play();
    }
    changeButtonSymbol(e.target);
  });

function changeButtonSymbol(e) {
  if (state.introPlaying) {
    e.src = '../img/Knapper-stopp.png';
  } else {
    e.src = '../img/Knapp-spill.png';
  }
}

export {
  initTask,
  updateTimeDisplay,
  startUITask,
  endTask,
  updateWordDisplay,
  updateLetterDisplay,
  currentKeyHighlight,
  blinkCurrentKey,
  changeButtonSymbol,
};
