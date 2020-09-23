import { tasks } from './content.js';
import { state } from './gameState.js';
import {
  currentKeyHighlight,
  updateLetterDisplay,
  updateWordDisplay,
} from './ui.js';

const registry = [];

function _task() {
  return window.location.hash;
}

function inputInRegister(key) {
  if (key.length < 2) {
    return true;
  }

  if (registry.includes(key)) {
    // If you pressed control or such...
    return false;
  }

  return false;
}

function checkInput(key) {
  let t = tasks[parseInt(location.hash.slice(1)) - 1].task[state.currentLetter];

  // Checks if input is correct or not
  if (t.length === 1) {
    if (key === t) {
      state.currentLetter++;
      return true;
    }
  } else {
    if (key === t[state.currentWordLetter]) {
      if (t.length === state.currentWordLetter + 1) {
        state.currentWordLetter = 0;
        state.currentLetter++;
      } else {
        state.currentWordLetter++;
      }
      return true;
    }
  }
  return false;
}

function handleCorrectKeyPress() {
  let t = tasks[parseInt(location.hash.slice(1)) - 1].task;

  if (state.currentLetter === t.length) {
    console.log('Game won!!');
    state.hasWon = true;
    return;
  }

  currentKeyHighlight();

  if (t[state.currentLetter].length > 1) {
    updateWordDisplay();
  } else {
    updateLetterDisplay();
  }
}

function handleWrongKeyPress() {
  // Play wrong sound
}

export {
  inputInRegister,
  checkInput,
  handleCorrectKeyPress,
  handleWrongKeyPress,
};
