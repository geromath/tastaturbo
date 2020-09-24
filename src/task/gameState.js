let state = {
  isRunning: false,
  hasWon: false,
  startTime: 180,
  time: 180,
  startState: function (task) {
    this.startTime = task.time;
    this.time = task.time;
  },
  signValue: (function () {
    return localStorage.getItem('--signSlider') === '1';
  })(),
  soundValue: (function () {
    return localStorage.getItem('--soundSlider') === '1';
  })(),
  langValue: (function () {
    if (localStorage.getItem('--langSlider') === '1') {
      return 'Nb';
    }
    return 'Nn';
  })(),
  currentLetter: 0,
  currentWordLetter: 0,
};

export { state };
