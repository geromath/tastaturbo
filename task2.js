let currentLeft = document.getElementById('currentLeft');
let currentRight = document.getElementById('currentRight');

let currentTask = 0;
let currentKeyNumber = 0;

let gameStarted = false;
let correctAnswers = 0;
let failedAnswers = 0;
let finished = false;
let time = 110;
let originalTime = time;

const tasks = [
  'ddddddddkkkkkkkkddddddkkkkkkddddkkkkddkkkddddddkkkkkkddkkkddffddffkkjjkkjjffdfddkkkjkjkfffdddfffdddfjjkkkjjkkkjkjkffjjddkkfkjdkdfkjffkkddkkfdffjkjjddkkfjjkkdfj',
];

let keysToLeft = ['f', 'd', 's', 'a', 'b'];
let keysToRight = ['j', 'k', 'l', 'm', 'n'];

let currentKey = tasks[0][0];

let startButton = document.getElementById('start');
let startContainer = startButton.parentElement;
let taskContainer = document.getElementById('taskContainer');

let started = false;
let inputField = document.getElementById('inputField');

let f = document.getElementById('f');
let j = document.getElementById('j');
let wrong = document.getElementById('wrong');
let wrongInARow = 0;

let paused = false;

let logo = document.getElementById('logo');
logo.addEventListener('click', function () {
  location.href = '../';
});

startButton.addEventListener('click', function () {
  startContainer.classList.add('hidden');
  taskContainer.classList.remove('hidden');
  started = true;

  if (keysToLeft.includes(tasks[0][0])) {
    currentLeft.innerHTML = tasks[0][0];
  } else {
    currentRight.innerHTML = tasks[0][0];
  }
  playSound();
  updateTimer();

  // Skyter funksjonen hver gang bruker trykker en knapp
  window.addEventListener('keydown', function (event) {
    handleKeyPress(event);
  });
  inputField.focus();
});

document.getElementById('tryAgain').addEventListener('click', () => {
  location.reload();
});

document.getElementById('backToTasks').addEventListener('click', () => {
  location.href = '../';
});

inputField.addEventListener('beforeinput', function () {
  if (this.value.length > 0) {
    this.value = '';
  }
});

let timeLastKeyPress = 180;

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
  wrong.load();
  wrong.play();
  failedAnswers++;
  console.log(failedAnswers);
  if (wrongInARow > 2) {
    playSound();
  }
}

function isPaused() {
  return paused;
}

function playSound() {
  let sound = document.getElementById(
    '' + tasks[currentTask][currentKeyNumber]
  );
  if (sound !== undefined && sound && !isPaused()) {
    sound.load();
    sound.play();
  }
}

let highlightedKey;

function handleCorrectKeyPressed() {
  wrongInARow = 0;
  currentKey = currentKey.toLowerCase();
  correctAnswers++;
  currentKeyNumber++;

  currentKey = tasks[currentTask][currentKeyNumber];

  highlightedKey
    ? highlightedKey.classList.remove('key--highlight')
    : highlightedKey;

  let tastaturboMultiplier = currentKeyNumber / tasks[currentTask].length;
  document.documentElement.style.setProperty(
    '--tastaturboMultiplier',
    tastaturboMultiplier
  );

  console.log(correctAnswers);

  if (currentKeyNumber === tasks[currentTask].length) {
    currentLeft.innerHTML = '';
    currentRight.innerHTML = '';
    handleLevelComplete();
    return;
  } else {
    if (keysToLeft.includes(tasks[currentTask][currentKeyNumber])) {
      currentRight.innerHTML = '';
      playSound();
      currentLeft.classList.add('task__current--blink');
      setTimeout(function () {
        currentLeft.classList.remove('task__current--blink');
      }, 400);
      currentLeft.innerHTML = tasks[currentTask][currentKeyNumber];
    } else {
      currentLeft.innerHTML = '';
      playSound();
      currentRight.classList.add('task__current--blink');
      setTimeout(function () {
        currentRight.classList.remove('task__current--blink');
      }, 400);
      currentRight.innerHTML = tasks[currentTask][currentKeyNumber];
    }
  }
}

// Handles what happens if the game is finished
function handleLevelComplete() {
  if (correctAnswers === tasks[0].length) {
    document.getElementById('winSFX').load();
    document.getElementById('winSFX').play();
    finished = true;
    document.getElementById('feedback').innerHTML = 'Jeg klarte det!';
  } else {
    document.getElementById('loseSFX').load();
    document.getElementById('loseSFX').play();
    document.getElementById('feedback').innerHTML =
      'Jeg fikk det ikke helt til...';
  }
  document.getElementById('endScreen').classList.remove('hidden');
}

// Updates the timer every second.
function updateTimer() {
  if (timeLastKeyPress - time > 3) {
    timeLastKeyPress = time - 1;
    playSound();

    highlightedKey = document.querySelector('.' + currentKey);
    highlightedKey.classList.add('key--highlight');
  }

  time--;

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
