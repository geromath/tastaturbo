import { tasks } from './content.js';
import { state } from './gameState.js';
import {
  currentKeyHighlight,
  updateLetterDisplay,
  updateWordDisplay,
  blinkCurrentKey,
  wrongKeyPressedHighlight,
} from './ui.js';
import { addSoundToQueue, playSoundInstantly, playFingerToUse } from './sound.js';
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
    if (t.length > 1 && state.soundTimeQueue[state.soundTimeQueue.length - 1] != t[state.currentWordLetter]) {
      if (functionalWords.includes(t)) {
        if (state.langValue == 'bm') {
          addSoundToQueue(t + '_bm');
        } else {
          addSoundToQueue(t + '_nn');
        }
      } else {
        addSoundToQueue(t[state.currentWordLetter]);
      }
      state.lastLetterSoundPLayedAt = state.time;
    } else {
      if (state.soundTimeQueue[state.soundTimeQueue.length - 1] != t) {
        if (Number.isInteger(t) && t >= 10) {
          addSoundToQueue(t.toString()[state.currentWordLetter]);
        } else {
          addSoundToQueue(t);
        }
        state.lastLetterSoundPLayedAt = state.time;
      }
    }
  }
}

let functionalWords = [
  'comma',
  'dash',
  'dot',
  'exclamation',
  'question',
  'quote',
  'paren-left',
  'paren-right',
  'hash',

  'slash',
  'equals',
  'star',
  'colon',
  'plus',
];

function checkInput(key) {
  let t = tasks[parseInt(location.hash.slice(1)) - 1].task[state.currentLetter];

  // Checks if input is correct or not
  if (t.length === 1) {
    if (key === t) {
      state.currentLetter++;
      return true;
    }
  } else {
    if (functionalWords.includes(t)) {
      if (t === 'comma') {
        if (key === ',') {
          state.currentLetter++;
          return true;
        }
      } else if (t === 'dash') {
        if (key === '-') {
          state.currentLetter++;
          return true;
        }
      } else if (t === 'exclamation') {
        if (key === '!') {
          state.currentLetter++;
          return true;
        }
      } else if (t === 'question') {
        if (key === '?') {
          state.currentLetter++;
          return true;
        }
      } else if (t === 'quote') {
        if (key === '"') {
          state.currentLetter++;
          return true;
        }
      } else if (t === 'paren-left') {
        if (key === '(') {
          state.currentLetter++;
          return true;
        }
      } else if (t === 'paren-right') {
        if (key === ')') {
          state.currentLetter++;
          return true;
        }
      } else if (t === 'hash') {
        if (key === '#') {
          state.currentLetter++;
          return true;
        }
      } else if (t === 'slash') {
        if (key === '/') {
          state.currentLetter++;
          return true;
        }
      } else if (t === 'equals') {
        if (key === '=') {
          state.currentLetter++;
          return true;
        }
      } else if (t === 'star') {
        if (key === '*') {
          state.currentLetter++;
          return true;
        }
      } else if (t === 'colon') {
        if (key === ':') {
          state.currentLetter++;
          return true;
        }
      } else if (t === 'plus') {
        if (key === '+') {
          state.currentLetter++;
          return true;
        }
      } else {
        if (key === '.') {
          state.currentLetter++;
          return true;
        }
      }
    }
    if (Number.isInteger(t)) {
      if (t < 10) {
        if (parseInt(key) === t) {
          state.currentLetter++;
          return true;
        }
      } else {
        let temp = t.toString();
        if (key === temp[state.currentWordLetter]) {
          if (state.currentWordLetter === temp.length - 1) {
            state.currentLetter++;
            state.currentWordLetter = 0;
          } else {
            state.currentWordLetter++;
          }
          return true;
        }
        return false;
      }
    }
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

  if (
    t[state.currentLetter].length > 1 ||
    Number.isInteger(t[state.currentLetter])
  ) {
    updateWordDisplay();
    if (state.soundValue) {
      if (t[state.currentLetter][state.currentWordLetter] == ' ') {
        setTimeout(function () {
          playSoundInstantly('mellomromstasten');
        }, 300);
      } else if (Number.isInteger(t[state.currentLetter])) {
        if (state.currentWordLetter > 0) {
          setTimeout(function () {
            playSoundInstantly(t[state.currentLetter].toString()[state.currentWordLetter]);
            }, 300);
        } else {
          setTimeout(function () {
            playSoundInstantly(t[state.currentLetter]);
            }, 300);
        }
      } else if (functionalWords.includes(t[state.currentLetter])) {
        if (state.langValue == 'Bm') {
          setTimeout(function () {
            playSoundInstantly(t[state.currentLetter] + '_bm');
            }, 300);
        } else {
          setTimeout(function () {
            playSoundInstantly(t[state.currentLetter] + '_nn');
            }, 300);
        }
      } else {
        setTimeout(function () {
          playSoundInstantly(t[state.currentLetter][state.currentWordLetter]);
          }, 300);
      }
    }
  } else {
    updateLetterDisplay();
    if (state.soundValue) {
      setTimeout(function () {
        playSoundInstantly(t[state.currentLetter]);
      }, 300);
    }
  }
}

let wrongKeysInRow = 0;
function handleWrongKeyPress(key) {
  // Play wrong sound
  wrongKeyPressedHighlight(key);
  wrongKeysInRow ++;
  if (state.soundValue) {
    setTimeout(function () {
      playSoundInstantly('feil');
    }, 150);
  }
  
  if (wrongKeysInRow >= 5) {
    if (state.soundValue) {
      setTimeout(function () {
        playFingerToUse(key);
      }, 150);
    }
    wrongKeysInRow = 0;
  }
}

export {
  inputInRegister,
  checkInput,
  handleCorrectKeyPress,
  handleWrongKeyPress,
  timeSinceLastLetterSound,
};
