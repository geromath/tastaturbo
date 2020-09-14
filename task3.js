let currentLeft = document.getElementById('currentLeft');
let currentRight = document.getElementById('currentRight');

let currentTask = 0;
let currentKeyNumber = 0;

let gameStarted = false;
let correctAnswers = 0;
let failedAnswers = 0;
let finished = false;
let time = 180;

const tasks = [
  'ffffffffjjjjjjjjffffffjjjjjjfffjjjffjjffffjjjjfffjjjffjjjjffffffffjjjfjjjjjjjjffffjffffffjjjjffjfffJjfffJjjfJjjjffJjjjFffffffjFfjjFfffJjjjFffffffffJjjjjjjjjfffJjjfJFfJjf',
]

let keysToLeft = ['f', 'd', 's', 'a', 'b'];
keysToLeft.forEach((element) => {
  keysToLeft.push(element.toUpperCase());
});
let keysToRight = ['j', 'k', 'l', 'm', 'n'];
keysToRight.forEach((element) => {
  keysToRight.push(element.toUpperCase());
});

let currentKey = tasks[0][0];

// Skyter funksjonen hver gang bruker trykker en knapp
window.addEventListener("keydown", function (event) {
  handleKeyPress(event);
});

let startButton = document.getElementById('start');
let startContainer = startButton.parentElement;
let taskContainer = document.getElementById('taskContainer');

let started = false;

startButton.addEventListener('click', function () {
  startContainer.classList.add('hidden');
  taskContainer.classList.remove('hidden');
  inputField.focus();
  started = true;
  if (keysToLeft.includes(tasks[0][0])) {
    currentLeft.innerHTML = tasks[0][0];
  } else {
    currentRight.innerHTML = tasks[0][0];
  }
  updateTimer();
});


let inputField = document.getElementById('inputField');
console.log(inputField);

document.getElementById('tryAgain').addEventListener('click', () => {
  location.reload();
});

document.getElementById('backToTasks').addEventListener('click', () => {
  location.href = '../';
});

inputField.addEventListener('focus', () => {
  console.log('This is in focus')
});

inputField.addEventListener('beforeinput', function () {
  if (this.value.length > 0) {
    this.value = '';
  }
});

// Handles the key pressed. 
function handleKeyPress(event) {
  let k = event.key;

  currentKey = tasks[currentTask][currentKeyNumber];
  if (k === currentKey) {
    handleCorrectKeyPressed();
  } else if (k === "Shift") {
    return null;
  } else {
    handleWrongKeyPressed();
  }
}

function handleWrongKeyPressed() {
  failedAnswers++;
  document.querySelector(
    ".stats__fail__number"
  ).innerHTML = failedAnswers;

  // TODO: Add auditive and visual feedback that something went wrong
}

function handleCorrectKeyPressed() {
  currentKey = currentKey.toLowerCase();
  correctAnswers++;
  currentKeyNumber++;

  let tastaturboMultiplier = currentKeyNumber / tasks[currentTask].length;
  document.documentElement.style.setProperty('--tastaturboTop', tastaturboMultiplier);
  document.documentElement.style.setProperty('--tastaturboRight', tastaturboMultiplier);
  document.documentElement.style.setProperty('--tastaturboScale', tastaturboMultiplier);

  let statCorrect = document.querySelector(".stats__correct__number");
  statCorrect.innerHTML = correctAnswers;

  if (currentKeyNumber === tasks[currentTask].length - 1) {
    currentLeft.innerHTML = "";
    currentRight.innerHTML = "";
    handleLevelComplete();
    return;
  } else {
    if (keysToLeft.includes(tasks[currentTask][currentKeyNumber])) {
      currentRight.classList.add('hidden');
      currentLeft.classList.remove('hidden');
      currentLeft.classList.add('task__current--blink');
      setTimeout(function () {
        currentLeft.classList.remove('task__current--blink');
      }, 400);
      currentLeft.innerHTML = tasks[currentTask][currentKeyNumber];
    } else {
      if (currentRight.classList.contains('hidden')) {
        currentLeft.classList.add('hidden');
        currentRight.classList.remove('hidden');
      } else {
        currentRight.classList.add('task__current--blink');
      }
      setTimeout(function () {
        currentRight.classList.remove('task__current--blink');
      }, 400);
      currentRight.innerHTML = tasks[currentTask][currentKeyNumber];
    }
  }
}

// Handles what happens if the game is finished
function handleLevelComplete() {
  finished = true;
  document.getElementById('endScreen').classList.remove('hidden');
  document.getElementById('totalCorrect').innerHTML = correctAnswers;
  document.getElementById('totalTries').innerHTML = tasks[0].length;
  document.getElementById('wpm').innerHTML = Math.floor(correctAnswers / ((180 - time) / 60));
  console.log("Game is finished!");
}

// Updates the timer every second.
function updateTimer() {
  let minutes = document.querySelector('.stats__minutes');
  let seconds = document.querySelector('.stats__seconds');
  if (time > 59) {
    minutes.innerHTML = Math.floor(time / 60);
  }
  if (time % 60 < 10) {
    seconds.innerHTML = '0' + time % 60;
  } else {
    seconds.innerHTML = time % 60;
  }
  if (time <= 0) {
    handleLevelComplete();
  }
  time--;

  if (finished) {
    return;
  }
  setTimeout(updateTimer, 1000);
}
