import { state } from "./gameState.js";

function initTask() {
  // Setting all the image sources
  document.getElementById("start-tt-figurine").src = "";
  document.getElementById("tt-figurine").src = "";
  document.getElementById("tt-background").src = "";
  document.getElementById("end-tt-figurine").src = "";
}

function startUITask() {
  // Hiding the start page
  document.getElementById("start-screen").classList.add("hidden");
}

function updateTimeDisplay() {
  document.documentElement.style.setProperty(
    "--timer",
    (state.time / 180) * 100 + "%"
  );
}

function endTask() {
  document.getElementById("end-screen").classList.remove("hidden");
}

export { initTask, updateTimeDisplay, startUITask, endTask };
