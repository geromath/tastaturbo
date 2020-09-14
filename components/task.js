import {
  intro,
  introNN,
  success,
  successNN,
  failure,
  failureNN,
  tasks,
} from './content.js';
import { highlightKey, highlightedKey } from './keyboardController.js';
import { sound } from './soundController.js';
import { language } from './settings.js';

let currentLeft = document.getElementById('currentLeft');
let currentRight = document.getElementById('currentRight');

let currentTask = location.hash.substr(1);
let currentKeyNumber = 0;

let currentSubKey = 0;

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

let keysToLeft = ['f', 'd', 's', 'a', 'b'];
let keysToRight = ['j', 'k', 'l', 'm', 'n'];

let currentKey = tasks[currentTask][currentKeyNumber];

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

if (language === 0) {
  document.getElementById('introText').innerHTML = intro[currentTask];
} else {
  document.getElementById('introText').innerHTML = introNN[currentTask];
}

document.getElementById('readAgain').addEventListener('click', function () {
  let c = parseInt(currentTask) + 1;
  if (language === 0) {
    sound.play('start_' + c + '_b');
  } else {
    sound.play('start_' + c + '_n');
  }
});

document.getElementById('pauseAudio').addEventListener('click', function () {
  let c = parseInt(currentTask) + 1;
  if (sound.isPlaying === true) {
    sound.pause();
  } else {
    if (language === 0) {
      sound.play('start_' + c + '_b');
    } else {
      sound.play('start_' + c + '_n');
    }
  }
});

if (language === 0) {
  sound.play('start_' + (parseInt(currentTask) + 1) + '_b');
} else {
  sound.play('start_' + (parseInt(currentTask) + 1) + '_n');
}

document.querySelector('.logo').addEventListener('click', () => {
  window.location = 'https://www.statped.no/';
});

startButton.focus();

startButton.addEventListener('click', function () {
  // Når man trykker på startknappen
  startContainer.classList.add('hidden');
  taskContainer.classList.remove('hidden');
  started = true;
  if (playingIntro) {
    document.getElementById('startSound').pause();
  }

  if (keysToLeft.includes(tasks[currentTask][currentKeyNumber])) {
    currentLeft.innerHTML = tasks[currentTask][currentKeyNumber];
  } else {
    currentRight.innerHTML = tasks[currentTask][currentKeyNumber];
  }
  sound.play(tasks[currentTask][currentKeyNumber]);
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
  // Bestem hva som skjer når man trykker en tast
  let k = event.key;
  timeLastKeyPress = time;

  if (k === currentKey) {
    handleCorrectKeyPressed();
  } else {
    handleWrongKeyPressed();
  }
}

// Logikken som bestemmer hva som skjer når man trykker feil
function handleWrongKeyPressed() {
  wrongInARow++;
  failedAnswers++;
  if (wrongInARow > 2) {
    wrongInARow = 0;
    sound.play('feil'); // Skal spille av hvilken knapp man sal trykke TODO: Må endres...
  }
}

// Logikken som bestemmer hva som skjer når man trykker riktig
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

  isBreakpointHit(correctAnswers);

  if (currentKeyNumber === tasks[currentTask].length) {
    // Hvis dette var siste tastetrykk i oppgaven
    currentLeft.innerHTML = '';
    currentRight.innerHTML = '';
    handleLevelComplete();
    return;
  } else {
    // Koden som kommer i denne else-blokken kan muligens flyttes til keyboardController.js
    if (keysToLeft.includes(tasks[currentTask][currentKeyNumber])) {
      currentRight.innerHTML = '';
      currentLeft.classList.add('task__current--blink');
      setTimeout(function () {
        currentLeft.classList.remove('task__current--blink');
      }, 400);
      currentLeft.innerHTML = tasks[currentTask][currentKeyNumber];
    } else {
      currentLeft.innerHTML = '';
      currentRight.classList.add('task__current--blink');
      setTimeout(function () {
        currentRight.classList.remove('task__current--blink');
      }, 400);
      currentRight.innerHTML = tasks[currentTask][currentKeyNumber];
    }
    sound.play(tasks[currentTask][currentKeyNumber]); // Spill av riktig lyd
  }
}

// Spiller av motiverende lyd
function isBreakpointHit() {
  if (correctAnswers === 15) {
    // Etter 15 riktige tastetrykk
    sound.play('15');
  }
  if (correctAnswers === Math.floor(tasks[currentTask].length / 2)) {
    // Etter halvparten riktig
    sound.play('half');
  }
  if (correctAnswers === tasks[currentTask].length - 15) {
    // Når det er 15 tastetrykk igjen
    sound.play('allBut15');
  }
}

// Spill av riktig lydeffekt når man er ferdig
function completeSoundEffect(result) {
  if (result === 1) {
    sound.play('win');
  } else {
    sound.play('lose');
  }
}

// Logikken som bestemmer hva som skjer når man er ferdig (enten tiden ute eller man har gjort ferdig alle bokstavene)
function handleLevelComplete() {
  let firstButtonText = '';
  let secondButtonText = '';

  if (correctAnswers === tasks[currentTask].length) {
    // Hvis man vinner
    completeSoundEffect(1);
    spawnFirework(10);
    finished = true;
    let successMessege;
    language == 0
      ? (successMessege = success[currentTask])
      : (successMessege = successNN[currentTask]);
    document.getElementById('feedback').innerHTML = successMessege;
    document.getElementById('tastaturboEnd').src = '../img/positiv.png';

    document.getElementById('tryAgain').innerHTML = 'Til startsiden';
    document.getElementById('tryAgain').addEventListener('click', () => {
      window.location.href = '../';
    });

    if (language === 0) {
      // Hvis bokmål
      firstButtonText = 'Til neste oppgave';
      secondButtonText = 'Til startskjerm';
    } else {
      // Hvis nynorsk
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
    // Hvis man taper
    let failureMessege;
    completeSoundEffect(0);
    language == 0
      ? (failureMessege = failure[currentTask])
      : (failureMessege = failureNN[currentTask]);

    if (language === 0) {
      // Hvis bokmål
      firstButtonText = 'Prøv igjen';
      secondButtonText = 'Til startskjerm';
    } else {
      // Hvis nynorsk
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
    if (time === originalTime - 45 * i) {
      console.log(i);
      sound.play('time', i);
    }
  }
}

// Oppdaterer hvert sekund.
function updateTimer() {
  if (currentKey.length === 1) {
    highlightKey(currentKey); // Highlighter hvilken knapp som skal trykkes
  } else {
    highlightKey(currentKey[currentSubKey]);
  }
  if (timeLastKeyPress - time > 5) {
    // Hvis man ikke har trykket på noen knapper de siste 4 sekunder, vil man spille av hvilken som skal trykkes på nytt
    timeLastKeyPress = time - 1;
    if (currentKey.length === 1) {
      sound.play(currentKey);
    } else {
      sound.play(currentKey[currentSubKey]);
    }
  }

  time--; // Setter tiden ett sekund ned

  isTimeBreakpointHit(); // Sjekker om det har gått 45 sekunder for å spille av BEEP.

  document.documentElement.style.setProperty(
    // Setter den visuelle delen av tiden
    '--filler',
    1 - time / originalTime
  );

  if (time == 0) {
    // Hvis tiden er ute
    finished = true;
    handleLevelComplete(); // Bestem hva som skjer når man er ferdig
  }
  if (finished) {
    return;
  }
  setTimeout(updateTimer, 1000);
}

// FIREWORKS
const colors = ['red', 'blue', 'green', 'purple', 'yellow'];

// Funksjonen som lager et visst antall
function spawnFirework(amount) {
  fireFireWork();
  amount--;
  if (amount > 0) {
    setTimeout(function () {
      spawnFirework(amount);
    }, 600);
  }
}

// Funksjonen som lager et fyrverkeri
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

// Funksjonen som lager en partikkel
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
