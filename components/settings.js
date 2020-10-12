
// LocalStorage functions
const setLocalValue = function (id, value) {
  localStorage.setItem(id, value);
};

const getLocalValue = function (id) {
  return localStorage.getItem(id);
};

// Koden under er selvkjørende funksjoner som returnerer innstilling-verdien. 
let language = (function () {
  if (parseInt(getLocalValue('--langSlider')) === 1) {
    return 1;
  } else {
    return 0;
  }
})();

const soundValue = (function () {
  if (parseInt(getLocalValue('--soundSlider')) === 1) {
    return 1;
  } else {
    return 0;
  }
})();

const signValue = (function () {
  if (parseInt(getLocalValue('--signSlider')) === 1) {
    return 1;
  } else {
    return 0;
  }
})();

export { language, soundValue, signValue, setLocalValue, getLocalValue };
