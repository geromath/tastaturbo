/* This file contains the game loops. One time oriented loop and one loop that handles user input. */

/* #### IMPORTS #### */
import {
  inputInRegister,
  checkInput,
  handleCorrectKeyPress,
  handleWrongKeyPress,
  timeSinceLastLetterSound,
} from './keyboard.js';

import {
  checkSoundTimeQueue,
  playSoundFromTimeQueue,
  addSoundToQueue,
  playIntroSound,
  playOutroSound,
} from './sound.js';

import { initTask, startUITask, updateTimeDisplay, endTask } from './ui.js';

import { state } from './gameState.js';
import { tasks } from './content.js';

import { initAnimation } from './animation.js';

function init() {
  initTask(state.signValue);
  initAnimation();

  if (tasks[parseInt(location.hash.slice(1) - 1)].task[0].length > 1) {
    addSoundToQueue(tasks[parseInt(location.hash.slice(1) - 1)].task[0][0]);
  } else {
    addSoundToQueue(tasks[parseInt(location.hash.slice(1) - 1)].task[0]);
  }

  if (state.soundValue) {
    playIntroSound();
  }
}

function startTask() {
  if (!document.getElementById('instant-audio').paused) {
    document.getElementById('instant-audio').pause();
  }

  startUITask();

  state.isRunning = true; // Start the task countdown
  state.startState(tasks[parseInt(location.hash.slice(1) - 1)]);

  update(); //Start the game

  document.addEventListener('keypress', function (event) {
    inputUpdate(event.key);
  });
}

function update() {
  // Updates every second
  _countdownTime(); // Updates the time (counting down)
  updateTimeDisplay(); // Updates UI

  if (state.soundValue) {
    if (checkSoundTimeQueue()) {
      playSoundFromTimeQueue();
    }

    timeSinceLastLetterSound();

    if (state.time % (state.startTime / 4) === 0) {
      addSoundToQueue('beep');
    }
  }

  if (state.time > 0 && gameIsRunning()) {
    setTimeout(update, 1000);
  }
}

function inputUpdate(key) {
  // Updates at every time a key in the register is pressed
  if (inputInRegister(key)) {
    // Checks if input is in "safe" key
    if (checkInput(key)) {
      // Checks if input is a correct input or not
      handleCorrectKeyPress();
      if (state.currentLetter === 10) {
        addSoundToQueue('Nå er vi i gang'); // Igang
      } else if (
        state.currentLetter ===
        tasks[parseInt(location.hash.slice(1) - 1)].task.length / 2
      ) {
        addSoundToQueue('Nå er vi halvveis'); // Halvveis
      } else if (
        state.currentLetter ===
        tasks[parseInt(location.hash.slice(1) - 1)].task.length - 10
      ) {
        addSoundToQueue('Vi klarer det snart'); // Snart i mål
      }
    } else {
      handleWrongKeyPress();
    }
  }

  if (gameVictory()) {
    // Do something to celebrate the victory
    endTask();
  }
}

function gameIsRunning() {
  // Checks if the game is running or not
  return state.isRunning;
}

function setGameState(running) {
  state.isRunning = running;
}

function _countdownTime() {
  state.time--;
  if (state.time == 0) {
    _gameOver();
  }
}

function _gameOver() {
  // If time hits 0, game is over and the user lost (most likely)
  // Needs to do the game lost stiff (UI Stuff most likely)
  setGameState(false);
  endTask();
}

function gameVictory() {
  return state.hasWon;
}

init();

document.getElementById('start-button').addEventListener('click', startTask);
document.getElementById('start-button').focus();
