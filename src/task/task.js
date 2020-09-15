/* This file contains the game loops. One time oriented loop and one loop that handles user input. */

/* #### IMPORTS #### */
import {
  inputInRegister,
  checkInput,
  handleCorrectKeyPress,
  handleWrongKeyPress,
} from ".keyboard";

function update() {
  // Updates every second
}

function inputUpdate() {
  // Updates at every time a key in the register is pressed
  if (inputInRegister()) {
    // Checks if input is in "safe" key
    if (checkInput()) {
      // Checks if input is a correct input or not
      handleCorrectKeyPress();
    } else {
      handleWrongKeyPress();
    }
  }
}
