import { state } from './gameState.js';
import { changeButtonSymbol } from './ui.js';

let timeAudioElement = document.getElementById('time-audio');
let instantAudioElement = document.getElementById('instant-audio');

function checkSoundTimeQueue() {
  if (state.soundTimeQueue.length > 0) {
    return true;
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
  timeAudioElement.src =
    '../sound/' + state.soundTimeQueue.splice(0, 1) + '.mp3';
  if (state.soundTimeQueue.length > 0) {
    timeAudioElement.play();
    timeAudioElement.addEventListener('onended', playSoundFromTimeQueue());
  } else {
    timeAudioElement.play();
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

export {
  checkSoundTimeQueue,
  playSoundFromTimeQueue,
  addSoundToQueue,
  playSoundInstantly,
  playIntroSound,
  playOutroSound,
};
