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

import {
  initTask,
  startUITask,
  updateTimeDisplay,
  endTask,
  changeButtonSymbol,
} from './ui.js';

import { state } from './gameState.js';
import { tasks } from './content.js';

import { initAnimation } from './animation.js';
import { language } from '../../components/settings.js';

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

function init() {
  initTask(state.signValue);
  initAnimation();

  let task = tasks[parseInt(location.hash.slice(1) - 1)].task[0];

  if (task.length > 1) {
    if (functionalWords.includes(task)) {
      if (state.langValue == 'Bm') {
        addSoundToQueue(task + '_bm');
      } else {
        addSoundToQueue(task + '_nn');
      }
    } else {
      addSoundToQueue(task.trim());
      addSoundToQueue(task[0]);
    }
  } else {
    addSoundToQueue(task);
  }

  if (state.soundValue) {
    playIntroSound();
    changeButtonSymbol(document.getElementById('ss-play-button-1'));
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
  _countdownTime(); // Updates the time (counting down)
  updateTimeDisplay(); // Updates UI

  if (state.soundValue) {
    if (checkSoundTimeQueue()) {
      playSoundFromTimeQueue();
    }

    timeSinceLastLetterSound();

    if (state.time % (state.startTime / 4) === 0) {
      document.getElementById('timed-audio').src = '../sound/beep.mp3';
      document.getElementById('timed-audio').play();
    }
  }

  if (state.time > 0 && gameIsRunning()) {
    setTimeout(update, 1000);
  }
}

function inputUpdate(key) {
  if (gameVictory()) {
    // TODO: Do something to celebrate the victory
    setGameState(false);
    endTask(true);
    playOutroSound(true);
  }

  const middleSoundBm = ['bm_kom-igjen-halvveis', 'bm_nå-halvveis']
  const endSoundBm = ['bm_klarer-snart', 'bm_jippi-nå-like-ved-mål']
  
  const middleSoundNn = ['nn_kom-igjen-halvvegs', 'nn_no-halvvegs']
  const endSoundNn = ['nn_klarer-snart', 'nn_jippi-no-like-ved-mål']

  // Updates at every time a key in the register is pressed
  if (inputInRegister(key)) {
    // Checks if input is in "safe" key
    if (checkInput(key)) {
      // Checks if input is a correct input or not
      handleCorrectKeyPress();
      
      let timedAudio = document.getElementById('progression-audio');
      if (state.currentLetter === 10) {
        if (state.langValue == 'Bm') {
          timedAudio.src = '../sound/bm_godt-i-gang.mp3';
        } else {
          timedAudio.src = '../sound/nn_godt-i-gang.mp3'; 
        }
        timedAudio.play();
      } else if (
        state.currentLetter ===
        tasks[parseInt(location.hash.slice(1) - 1)].task.length / 2
      ) {
        if (state.langValue == 'Bm') {
          timedAudio.src = '../sound/' + middleSoundBm[Math.floor(Math.random(0) * 2) - 1] + '.mp3';
        } else {
          timedAudio.src = '../sound/' + middleSoundNn[Math.floor(Math.random(0) * 2) - 1] + '.mp3';
        }
        timedAudio.play();
      } else if (
        state.currentLetter ===
        tasks[parseInt(location.hash.slice(1) - 1)].task.length - 10
      ) {
        if (state.langValue == 'Bm') {
          timedAudio.src = '../sound/' + endSoundBm[Math.floor(Math.random(0) * 2) - 1] + '.mp3';
        } else {
          timedAudio.src = '../sound/' + endSoundNn[Math.floor(Math.random(0) * 2) - 1] + '.mp3';
        }
        timedAudio.play();
      }
    } else {
      handleWrongKeyPress(key);
    }
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
  setGameState(false);
  if (!state.hasWon) {
    endTask(false);
    playOutroSound(false);
  }
}

function gameVictory() {
  return state.hasWon;
}

init();

document.getElementById('start-button').addEventListener('click', startTask);
document.getElementById('start-button').focus();
