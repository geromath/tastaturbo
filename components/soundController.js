import { soundValue } from './settings.js';


// Denne koden styrer lyden. For at lyden skal spille må innstillinger være satt til lyd på uansett
const sound = {
  audio: document.getElementById('audio'),
  timeBreakpoint: 0,
  isPlaying: false,
  play: function (source, ...args) {
    if (parseInt(soundValue) != 1) {
      audio.src = '../sound/' + source + '.mp3';
      this.isPlaying = true;
      audio.load();
      audio.play();
      if (source === 'time') {
        this.audio.onended = function () {
          if (args[0] > 1) {
            this.isPlaying = true;
            audio.src = '../sound/time.mp3';
            audio.load();
            audio.play();
            args[0]--;
          }
        };
      }

      this.audio.onended = function () {
        this.isPlaying = false;
      };
    }
  },
  pause: function () {
    this.audio.pause();
    this.isPlaying = false;
  },
};

export { sound };
