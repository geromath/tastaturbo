import { state } from './gameState.js';
import { tasks } from './content.js';

const language = 'nb'; // TODO: Change this to refer to the settings...

const imgSource = '../img/';
let taskNumber = parseInt(location.hash.slice(1));

const task = tasks[taskNumber - 1];

if (taskNumber < 10) {
  taskNumber = '0' + taskNumber;
}

function initTask(sign) {
  if (sign) {
    // Vis tegnspråkversjonen
  } else {
    // Vis blinde-versjonen
  }
  document.getElementById('start-tt-figurine').src =
    imgSource + 'tastaturbo-' + taskNumber + '-figuren.png';

  if (language === 'nb') {
    document.getElementById('intro-text').innerHTML = task.introNb;
  } else {
    document.getElementById('intro-text').innerHTML = task.introNn;
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

export {
  initTask,
  updateTimeDisplay,
  startUITask,
  endTask,
  updateWordDisplay,
  updateLetterDisplay,
};
