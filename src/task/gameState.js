let state = {
  isRunning: false,
  hasWon: false,
  startTime: 180,
  time: 180,
  lastLetterSoundPLayedAt: 180,
  startState: function (task) {
    this.startTime = task.time;
    this.time = task.time;
    this.lastLetterSoundPLayedAt = task.time;
  },
  signValue: (function () {
    return localStorage.getItem('--signSlider') === '1';
  })(),
  soundValue: (function () {
    return localStorage.getItem('--soundSlider') === '0';
  })(),
  langValue: (function () {
    if (localStorage.getItem('--langSlider') === '1') {
      return 'Nb';
    }
    return 'Nn';
  })(),
  currentLetter: 0,
  currentWordLetter: 0,

  soundTimeQueue: [],

  lection: parseInt(location.hash.slice(1)) - 1,
};

export { state };
