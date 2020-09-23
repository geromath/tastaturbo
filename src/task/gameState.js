let state = {
  isRunning: false,
  hasWon: false,
  startTime: 180,
  time: 180,
  startState: function (task) {
    this.startTime = task.time;
    this.time = task.time;
  },
  currentLetter: 0,
  currentWordLetter: 0,
};

export { state };
