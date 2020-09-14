import {
  intro,
  introNN,
  success,
  successNN,
  failure,
  failureNN,
  task,
} from './content.js';

import { language, soundValue } from './settings.js';

let currentLeft = document.getElementById('currentLeft');
let currentRight = document.getElementById('currentRight');

let currentTask = location.hash.substr(1);
let currentKeyNumber = 0;

let correctAnswers = 0;
let failedAnswers = 0;
let finished = false;
let time = 180;
const originalTime = time;
let timeBreakPoints = [];

let timeIndex = 0;
while (true) {
  if (time - 30 * timeIndex > 0) {
    timeBreakPoints.push(time - 30 * timeIndex);
  } else {
    break;
  }
  timeIndex++;
}
time = 180;

let lang = language;

const tasks = [
  'ffffffffjjjjjjjjffffffjjjjjjfffjjjffjjffffjjjjfffjjjffjjjjffffffffjjjfjjjjjjjjffffjffffffjjjjffjfffjjfffjjjfjjjjffjjjjfffffffjffjjffffjjjjfffffffffjjjjjjjjjfffjjjfjffjjf',
];

let keysToLeft = ['f', 'd', 's', 'a', 'b'];
let keysToRight = ['j', 'k', 'l', 'm', 'n'];

const keyboardColors = {
  pinky: '#0000ff',
  ring: '#ff0000',
  long: '#ffff00',
  point: '#00ff00',
};

const pinky = ['1', 'q', 'a', 'z', '0', 'p', 'ø', '-'];
const ring = ['2', 'w', 's', 'x', '9', 'o', 'l' /* TODO: Add . */];
const long = ['3', 'e', 'd', 'c', '8', 'i', 'k', ','];
const point = [
  '4',
  'r',
  'f',
  'v',
  '5',
  't',
  'g',
  'b',
  '6',
  'y',
  'h',
  'n',
  '7',
  'u',
  'j',
  'm',
];

let currentKey = task[currentTask][currentKeyNumber];

let startButton = document.getElementById('start');
let startContainer = startButton.parentElement;
let taskContainer = document.getElementById('taskContainer');

let started = false;
let inputField = document.getElementById('inputField');
let wrong = document.getElementById('wrong');
let wrongInARow = 0;

let playingIntro = false;

let paused = false;

let logo = document.getElementById('logo');
logo.addEventListener('click', function () {
  location.href = '../';
});

if (lang === 'b') {
  document.getElementById('introText').innerHTML = intro[currentTask];
} else {
  document.getElementById('introText').innerHTML = introNN[currentTask];
}

document.getElementById('readAgain').addEventListener('click', function () {
  playIntroSound();
});

function playIntroSound() {
  let introSound = document.getElementById('startSound');
  let c = parseInt(currentTask) + 1;

  if (lang === 'b') {
    introSound.src = '../sound/start_' + c + '_b.mp3';
  } else {
    introSound.src = '../sound/start_' + c + '_n.mp3';
  }
  introSound.load();
  introSound.play();
  playingIntro = true;
}

document.querySelector('.logo').addEventListener('click', () => {
  window.location = 'https://www.statped.no/';
});

startButton.focus();

startButton.addEventListener('click', function () {
  startContainer.classList.add('hidden');
  taskContainer.classList.remove('hidden');
  started = true;
  if (playingIntro) {
    document.getElementById('startSound').pause();
  }

  if (keysToLeft.includes(task[currentTask][currentKeyNumber])) {
    currentLeft.innerHTML = task[currentTask][currentKeyNumber];
  } else {
    currentRight.innerHTML = task[currentTask][currentKeyNumber];
  }
  playSound();
  updateTimer();

  // Skyter funksjonen hver gang bruker trykker en knapp
  window.addEventListener('keydown', function (event) {
    handleKeyPress(event);
  });
  inputField.focus();
});

inputField.addEventListener('beforeinput', function () {
  if (this.value.length > 0) {
    this.value = '';
  }
});

let timeLastKeyPress = originalTime;

// Handles the key pressed.
function handleKeyPress(event) {
  let k = event.key;
  timeLastKeyPress = time;

  if (k === currentKey) {
    handleCorrectKeyPressed();
  } else {
    handleWrongKeyPressed();
  }
}

function handleWrongKeyPressed() {
  wrongInARow++;
  failedAnswers++;
  playWrongSound();
  if (wrongInARow > 2) {
    wrongInARow = 0;
    playSound();
  }
}

function playWrongSound() {
  if (soundValue != 1) {
    wrong.load();
    wrong.play();
  }
}

function playSound() {
  let sound = document.getElementById('' + task[currentTask][currentKeyNumber]);
  if (sound != undefined && sound && soundValue != 1) {
    sound.load();
    sound.play();
  }
}

let highlightedKey;

function highlightKey(key) {
  if (pinky.includes(key)) {
    highlightedKey = key;
    document.documentElement.style.setProperty(
      '--highlightColor',
      keyboardColors.pinky
    );
  }
  if (ring.includes(key)) {
    highlightedKey = key;
    document.documentElement.style.setProperty(
      '--highlightColor',
      keyboardColors.ring
    );
  }
  if (long.includes(key)) {
    highlightedKey = key;
    document.documentElement.style.setProperty(
      '--highlightColor',
      keyboardColors.long
    );
  }
  if (point.includes(key)) {
    highlightedKey = key;
    document.documentElement.style.setProperty(
      '--highlightColor',
      keyboardColors.point
    );
  }
  highlightedKey = document.querySelector('.' + key);
  highlightedKey.classList.add('key--highlight');
}

function handleCorrectKeyPressed() {
  wrongInARow = 0;
  currentKey = currentKey.toLowerCase();
  correctAnswers++;
  currentKeyNumber++;

  currentKey = task[currentTask][currentKeyNumber];

  highlightedKey
    ? highlightedKey.classList.remove('key--highlight')
    : highlightedKey;

  let tastaturboMultiplier = currentKeyNumber / task[currentTask].length;
  document.documentElement.style.setProperty(
    '--tastaturboMultiplier',
    tastaturboMultiplier
  );

  isBreakpointHit(correctAnswers);

  if (currentKeyNumber === task[currentTask].length) {
    currentLeft.innerHTML = '';
    currentRight.innerHTML = '';
    handleLevelComplete();
    return;
  } else {
    if (keysToLeft.includes(task[currentTask][currentKeyNumber])) {
      currentRight.innerHTML = '';
      playSound();
      currentLeft.classList.add('task__current--blink');
      setTimeout(function () {
        currentLeft.classList.remove('task__current--blink');
      }, 400);
      currentLeft.innerHTML = task[currentTask][currentKeyNumber];
    } else {
      currentLeft.innerHTML = '';
      playSound();
      currentRight.classList.add('task__current--blink');
      setTimeout(function () {
        currentRight.classList.remove('task__current--blink');
      }, 400);
      currentRight.innerHTML = task[currentTask][currentKeyNumber];
    }
  }
}

function isBreakpointHit() {
  if (correctAnswers === 15) {
    playEncuragingSound(1);
  }
  if (correctAnswers === Math.floor(task[currentTask].length / 2)) {
    playEncuragingSound(2);
  }
  if (correctAnswers === task[currentTask].length - 15) {
    playEncuragingSound(3);
  }
}

function playEncuragingSound(distance) {
  if (soundValue != 1) {
    let early = document.getElementById('early');
    let mid = document.getElementById('mid');
    let late = document.getElementById('late');
    if (distance === 1) {
      early.load();
      early.play();
    }
    if (distance === 2) {
      mid.load();
      mid.play();
    }
    if (distance === 3) {
      late.load();
      late.play();
    }
  }
}

function completeSoundEffect(result) {
  if (soundValue != 1) {
    if (result === 1) {
      document.getElementById('winSFX').load();
      document.getElementById('winSFX').play();
    } else {
      document.getElementById('loseSFX').load();
      document.getElementById('loseSFX').play();
    }
  }
}

// Handles what happens if the game is finished
function handleLevelComplete() {
  let firstButtonText = '';
  let secondButtonText = '';

  if (correctAnswers === task[currentTask].length) {
    completeSoundEffect(1);
    spawnFirework(10);
    finished = true;
    let successMessege;
    lang == 'b'
      ? (successMessege = success[currentTask])
      : (successMessege = successNN[currentTask]);
    document.getElementById('feedback').innerHTML = successMessege;
    document.getElementById('tastaturboEnd').src = '../img/positiv.png';

    document.getElementById('tryAgain').innerHTML = 'Til startsiden';
    document.getElementById('tryAgain').addEventListener('click', () => {
      window.location.href = '../';
    });

    if (lang === 'b') {
      firstButtonText = 'Til neste oppgave';
      secondButtonText = 'Til startskjerm';
    } else {
      firstButtonText = 'Til neste oppgåve';
      secondButtonText = 'Til startskjerm';
    }

    document.getElementById('backToTasks').innerHTML = firstButtonText;
    document.getElementById('tryAgain').innerHTML = secondButtonText;

    let nextTask = parseInt(currentTask) + 2;
    document.getElementById('backToTasks').addEventListener('click', () => {
      window.location.href =
        '../html/task' + nextTask + '.html#' + (parseInt(currentTask) + 1);
    });
  } else {
    let failureMessege;
    completeSoundEffect(0);
    lang == 'b'
      ? (failureMessege = failure[currentTask])
      : (failureMessege = failureNN[currentTask]);

    if (lang === 'b') {
      firstButtonText = 'Prøv igjen';
      secondButtonText = 'Til startskjerm';
    } else {
      firstButtonText = 'Prøv igjen';
      secondButtonText = 'Til startskjerm';
    }
    document.getElementById('feedback').innerHTML = failureMessege;
    document.getElementById('tastaturboEnd').src = '../img/negativ.svg';

    document.getElementById('tryAgain').innerHTML = firstButtonText;
    document.getElementById('tryAgain').addEventListener('click', () => {
      location.reload();
    });

    document.getElementById('backToTasks').innerHTML = secondButtonText;
    document.getElementById('backToTasks').addEventListener('click', () => {
      window.location.href = '../';
    });
  }
  taskContainer.classList.add('hidden');
  document.getElementById('endScreen').classList.remove('hidden');
}

function isTimeBreakpointHit() {
  for (let i = 0; i < Math.floor(180 / 45); i++) {
    if (time == originalTime - 45 * i) {
      if (soundValue != 1) {
        console.log('Time breakpoint hit');
        for (let j = 0; j < i; j++) {
          document.getElementById('beep').load();
          document.getElementById('beep').play();
        }
      }
    }
  }
}

// Updates the timer every second.
function updateTimer() {
  highlightKey(currentKey);
  if (timeLastKeyPress - time > 6) {
    timeLastKeyPress = time - 1;
    playSound();
  }

  time--;

  isTimeBreakpointHit();

  document.documentElement.style.setProperty(
    '--filler',
    1 - time / originalTime
  );

  if (time == 0) {
    finished = true;
    handleLevelComplete();
  }
  if (finished) {
    return;
  }
  setTimeout(updateTimer, 1000);
}

// FIREWORKS
const colors = ['red', 'blue', 'green', 'purple', 'yellow'];

function spawnFirework(amount) {
  fireFireWork();
  amount--;
  if (amount > 0) {
    setTimeout(function () {
      spawnFirework(amount);
    }, 600);
  }
}

function fireFireWork() {
  let fireworkAmout = 4 + Math.floor(Math.random() * 10);
  let fireworkX = Math.floor(Math.random() * (window.innerWidth - 200));
  let fireworkY = Math.floor(Math.random() * (window.innerHeight - 200));

  let fw = document.createElement('div');
  fw.classList.add('fireworks');

  let fwInner = document.createElement('div');
  fwInner.classList.add('fireworks__inner');
  fw.appendChild(fwInner);

  fw.style.top = fireworkY + 'px';
  fw.style.left = fireworkX + 'px';

  document.getElementById('endScreen').appendChild(fw);

  for (let i = 0; i <= fireworkAmout; i++) {
    createSpark(fw);
  }
}

function createSpark(parent) {
  let span = document.createElement('span');

  let w = Math.random() * 2;
  w < 1 ? (w = 1) : (w = w);
  span.style.width = w + 'rem';
  let h = w - Math.random() * 0.2;
  span.style.height = h + 'rem';
  span.style.top = Math.floor(Math.random() * 100) + '%';
  span.style.left = Math.floor(Math.random() * 100) + '%';

  let r = Math.floor(Math.random() * 360);
  document.documentElement.style.setProperty('--rotation', r + 'deg');

  span.style.backgroundColor =
    colors[Math.floor(Math.random() * colors.length)];

  span.classList.add('spark');
  let animNumber = Math.floor(Math.random() * 9 + 1);
  span.classList.add('spark__animation--' + animNumber);
  parent.appendChild(span);
}

playIntroSound();
