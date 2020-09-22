import { tasks } from "./content.js";

const registry = [];

function _task() {
  return window.location.hash;
}

function inputInRegister(key) {
  if (key.length < 2) {
    return true;
  }

  if (registry.includes(key)) {
    return true;
  }

  return false;
}

function checkInput(key) {
  // Checks if input is correct or not
}

function handleCorrectKeyPress() {
  // What to do if the keypress was correct

  // Hvis game er vunnet
  if (true) {
    state.hasWon = true;
  }
}

function handleWrongKeyPress() {
  // What to do if the keypress was wrong
}

export {
  inputInRegister,
  checkInput,
  handleCorrectKeyPress,
  handleWrongKeyPress,
};
