let soundTimeQueue = [];

function checkSoundTimeQueue() {
  if (soundTimeQueue.length > 0) {
    return true;
  }
  return false;
}

function playSoundFromTimeQueue() {}

export { checkSoundTimeQueue, playSoundFromTimeQueue };
