import { tasks } from './content.js';
import { state } from './gameState.js';

const taskObject = tasks[parseInt(location.hash.slice(1)) - 1];
const animation = taskObject.animation;
const task = taskObject.task;
let currentAnimationStep = 0;
let animationStepsTaken = 0;
let goalX = 0;
let goalY = 0;
let currentX = taskObject.startPosition[0];
let currentY = taskObject.startPosition[1];
let previousX = 0;
let previousY = 0;

let taskParts = [];

function initAnimation() {
  // Del opp animationsstykker  ut fra lengden på oppgaven og antall animasjon-keyframes
  for (let i = 0; i < animation.length; i++) {
    if (i === animation.length - 1) {
      let lastLength = 0;
      for (let j = 0; j < taskParts.length; j++) {
        lastLength += taskParts[j];
      }
      taskParts.push(task.length - lastLength);
    } else {
      taskParts.push(Math.floor(task.length / animation.length));
    }
  }

  goalX = animation[0][0];
  goalY = animation[0][1];
  previousX = currentX;
  previousY = currentY;

  document.documentElement.style.setProperty('--currentX', currentX + '%');
  document.documentElement.style.setProperty('--currentY', currentY + '%');
  animationStepsTaken = taskParts[0];
}

function progressAnimation() {
  // Sjekker hvilket steg man er på og om man burde bytte steg
  for (let i = currentAnimationStep; i < taskParts.length; i++) {
    if (animationStepsTaken - state.currentLetter <= 0) {
      currentAnimationStep++;
      goalX = animation[currentAnimationStep][0];
      goalY = animation[currentAnimationStep][1];
      previousX = currentX;
      previousY = currentY;
      break;
    }
  }

  // Om man har nådd 0, bytt steg
  if (
    currentAnimationStep > 0 &&
    animationStepsTaken - state.currentLetter <= 0
  ) {
    animationStepsTaken += taskParts[currentAnimationStep];
  }

  // Animate!!
  if (goalX > previousX) {
    currentX =
      (goalX - previousX) *
      ((state.currentLetter - animationStepsTaken + taskParts[0]) /
        taskParts[currentAnimationStep]);
  } else {
    currentX =
      (previousX - goalX) *
      ((state.currentLetter - animationStepsTaken + taskParts[0]) /
        taskParts[currentAnimationStep]);
  }

  if (goalY > previousY) {
    currentY =
      (goalY - previousY) *
      ((state.currentLetter - animationStepsTaken + taskParts[0]) /
        taskParts[currentAnimationStep]);
  } else {
    currentY =
      (previousY - goalY) *
      ((state.currentLetter - animationStepsTaken + taskParts[0]) /
        taskParts[currentAnimationStep]);
  }

  document.documentElement.style.setProperty('--currentX', currentX + '%');
  document.documentElement.style.setProperty('--currentY', currentY + '%');

  if (animation.length > 2) {
    // Do a rotation
  }
}

export { initAnimation, progressAnimation };
