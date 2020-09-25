import { state } from './gameState.js';

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
    timeAudioElement.addEventListener('ended', playSoundFromTimeQueue());
  } else {
    timeAudioElement.play();
  }
}

export {
  checkSoundTimeQueue,
  playSoundFromTimeQueue,
  addSoundToQueue,
  playSoundInstantly,
};
