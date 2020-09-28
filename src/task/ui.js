import { state } from './gameState.js';
import { tasks } from './content.js';

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
    imgSource + 'tastaturbo-' + taskNumber + '-figuren.png';

  if (state.langValue === 'Nb') {
    document.getElementById('intro-text-blind').innerHTML = task.introNb;
    document.getElementById('intro-text-sign').innerHTML = task.introNb;
  } else {
    document.getElementById('intro-text-blind').innerHTML = task.introNn;
    document.getElementById('intro-text-sign').innerHTML = task.introNn;
  }

  document.getElementById('tt-figurine').src =
    imgSource + 'tastaturbo-' + taskNumber + '-figuren.png';
  document.getElementById('tt-background').src =
    imgSource + 'tastaturbo-bakgrunn-' + taskNumber + '.png';
  document.getElementById('end-tt-figurine').src =
    imgSource + 'tastaturbo-' + taskNumber + '-figuren.png';
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

  let t = tasks[parseInt(location.hash.slice(1)) - 1].task[0];
  if (t.length === 1) {
    if (leftKeys.includes(t)) {
      document.getElementById('left-letter').innerHTML = t;
    } else {
      document.getElementById('right-letter').innerHTML = t;
    }
  } else {
    document.getElementById('word-current-letter').innerHTML = t[0];
    document.getElementById('word-next-letter').innerHTML = t.slice(
      1,
      t.length
    );
  }

  currentKeyHighlight();
}

function updateLetterDisplay() {
  cleanSlate();

  let t = tasks[parseInt(location.hash.slice(1)) - 1].task[state.currentLetter];
  if (leftKeys.includes(t)) {
    document.getElementById('left-letter').innerHTML = t;
  } else {
    document.getElementById('right-letter').innerHTML = t;
  }
}

function updateWordDisplay() {
  cleanSlate();

  let w = tasks[parseInt(location.hash.slice(1)) - 1].task[state.currentLetter];
  if (state.currentWordLetter === 0) {
    document.getElementById('word-current.letter').innerHTML = w[0];
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

let highlighted;
function currentKeyHighlight() {
  if (highlighted) {
    highlighted.classList.remove('keyboard-blink');
  }

  let current =
    tasks[parseInt(location.hash.slice(1)) - 1].task[state.currentLetter];
  if (current.length === 1) {
    highlighted = document.querySelector('.' + current);
    setHighlightColor(current);
  } else {
    highlighted = document.querySelector(
      '.' + current[state.currentWordLetter]
    );
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

function endTask() {
  document.getElementById('end-screen').classList.remove('hidden');
  document.getElementById('main-screen').classList.add('hidden');
}

document
  .getElementById('ss-play-button-1')
  .addEventListener('click', function (e) {
    changeButtonSymbol(e);
  });

document
  .getElementById('ss-play-button-2')
  .addEventListener('click', function (e) {
    changeButtonSymbol(e);
  });

function changeButtonSymbol(e) {
  // TODO: Add logic for when it's supposed to be what...
  if (true) {
    e.target.src = '../img/Knapper-stopp.png';
  } else {
    e.target.src = '../img/Knapp-spill.png';
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
};
