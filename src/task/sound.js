import { tasks } from './content.js';
import { state } from './gameState.js';
import { changeButtonSymbol } from './ui.js';
import { hand } from './ui.js';

let timeAudioElement = document.getElementById('time-audio');
let instantAudioElement = document.getElementById('instant-audio');

function checkSoundTimeQueue() {
  if (state.soundTimeQueue.length > 0) {
    if (timeAudioElement.paused) {
      return true;
    }
  }
  return false;
}

function addSoundToQueue(soundSource) {
  state.soundTimeQueue.push(soundSource);
}

function playSoundInstantly(soundSource) {
  instantAudioElement.src = '../sound/' + soundSource + '.mp3';
  instantAudioElement.play();
}

function playSoundFromTimeQueue() {
  timeAudioElement.onended = null;
  let source = state.soundTimeQueue.shift();
  if (source != undefined) {
    if (source !== tasks[state.lection].task[state.currentLetter - 1]) {
      timeAudioElement.src = '../sound/' + source + '.mp3';
    }
  }
  if (state.soundTimeQueue.length > 0) {
    timeAudioElement.play();
    timeAudioElement.onended = function () {
      playSoundFromTimeQueue();
    }
  } else {
    if (timeAudioElement.paused) {
      timeAudioElement.play();
    } else {
      timeAudioElement.onended = function () {
        timeAudioElement.play();
      }
    }
  }
}

function playIntroSound() {
  let t = (state.lection + 1);
  if (t < 10) {
    t = '0' + t;
  }

  if (state.langValue == 'Nb') {
    instantAudioElement.src =
      '../sound/L' + t + '_bm_01.mp3';
  } else {
    instantAudioElement.src =
      '../sound/L' + t + '_nn_01.mp3';
  }
  instantAudioElement.load();
  let autoplayPromise = instantAudioElement.play();
  if (autoplayPromise !== undefined) {
    autoplayPromise.then(() => {
      state.introPlaying = true;
      instantAudioElement.addEventListener('onended', function () {
        state.introPlaying = false;
        changeButtonSymbol(document.getElementById('ss-play-button-1'));
      });
      changeButtonSymbol(document.getElementById('ss-play-button-1'));
    }).catch(error => {
      state.introPlaying = false;
      if (error.name === 'NotAllowedError') {
      }
    })
  }
}

function playOutroSound(victory) {
  let t = (state.lection + 1);
  if (t < 10) {
    t = '0' + t;
  }
  
  if (state.langValue == 'Nb') {
    if (victory) {
      instantAudioElement.src =
        '../sound/L' + t + '_bm_02.mp3';
    } else {
      instantAudioElement.src =
        '../sound/L' + t + '_bm_03.mp3';
    }
  } else {
    if (victory) {
      instantAudioElement.src =
        '../sound/L' + t + '_nn_02.mp3';
    } else {
      instantAudioElement.src =
        '../sound/L' + t + '_nn_03.mp3';
    }
  }
  instantAudioElement.play();
}

function playFingerToUse(key) {
  let source = '';
  if (hand.leftPinky.includes(key)) {
    source = 'leftpinky';
  } else if (hand.leftRing.includes(key)) {
    source = 'leftring';
  } else if (hand.leftLong.includes(key)) {
    source = 'leftlong';
  } else if (hand.leftPoint.includes(key)) {
    source = 'leftpoint';
  } else if (hand.rightPoint.includes(key)) {
    source = 'rightpoint';
  } else if (hand.rightLong.includes(key)) {
    source = 'rightlong';
  } else if (hand.rightRing.includes(key)) {
    source = 'rightring';
  } else if (hand.rightPinky.includes(key)) {
    source = 'rightpinky';
  }
  addSoundToQueue(source);
  addSoundToQueue(tasks[state.lection].task[state.currentLetter]);
  state.lastLetterSoundPLayedAt = state.time;
}

export {
  checkSoundTimeQueue,
  playSoundFromTimeQueue,
  addSoundToQueue,
  playSoundInstantly,
  playIntroSound,
  playOutroSound,
  playFingerToUse,
};
