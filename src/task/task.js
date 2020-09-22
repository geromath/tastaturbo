/* This file contains the game loops. One time oriented loop and one loop that handles user input. */

/* #### IMPORTS #### */
import {
  inputInRegister,
  checkInput,
  handleCorrectKeyPress,
  handleWrongKeyPress,
} from "./keyboard.js";

import { checkSoundTimeQueue, playSoundFromTimeQueue } from "./sound.js";

import { initTask, startUITask, updateTimeDisplay, endTask } from "./ui.js";

import { state } from "./gameState.js";

function startTask() {
  startUITask();

  //Start the game
  update();

  document.addEventListener("keypress", function (event) {
    inputUpdate(event.key);
  });
}

function update() {
  // Updates every second
  _countdownTime(); // Updates the time (counting down)
  updateTimeDisplay(); // Updates UI

  while (checkSoundTimeQueue()) {
    // Checks if sounds should be played
    playSoundFromTimeQueue();
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

initTask();

document.getElementById("start-button").addEventListener("click", startTask);
