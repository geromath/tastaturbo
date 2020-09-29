import { tasks } from './content.js';
import { state } from './gameState.js';
import {
  currentKeyHighlight,
  updateLetterDisplay,
  updateWordDisplay,
  blinkCurrentKey,
} from './ui.js';
import { addSoundToQueue, playSoundInstantly } from './sound.js';
import { progressAnimation } from './animation.js';

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

function timeSinceLastLetterSound() {
  let t = tasks[parseInt(location.hash.slice(1)) - 1].task[state.currentLetter];

  if (state.lastLetterSoundPLayedAt - state.time > 3) {
    if (t.length > 1) {
      addSoundToQueue(t[state.currentWordLetter]);
    } else {
      addSoundToQueue(t);
    }
    state.lastLetterSoundPLayedAt = state.time;
  }
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
    // Check if the word is comma, dash or something similar
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
  state.lastLetterSoundPLayedAt = state.time;

  if (state.currentLetter === t.length) {
    state.hasWon = true;
    return;
  }

  currentKeyHighlight();
  blinkCurrentKey();
  progressAnimation();

  if (t[state.currentLetter].length > 1) {
    updateWordDisplay();
    if (state.soundValue) {
      console.log(t[state.currentLetter][state.currentWordLetter] == ' ');
      if (t[state.currentLetter][state.currentWordLetter] == ' ') {
        playSoundInstantly('mellomrom');
      } else {
        playSoundInstantly(t[state.currentLetter][state.currentWordLetter]);
      }
    }
  } else {
    updateLetterDisplay();
    if (state.soundValue) {
      playSoundInstantly(t[state.currentLetter]);
    }
  }
}

function handleWrongKeyPress() {
  // Play wrong sound
  if (state.soundValue) {
    playSoundInstantly('feil');
  }
}

export {
  inputInRegister,
  checkInput,
  handleCorrectKeyPress,
  handleWrongKeyPress,
  timeSinceLastLetterSound,
};
