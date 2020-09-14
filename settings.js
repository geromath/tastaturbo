// LocalStorage functions
const setLocalValue = function (id, value) {
  localStorage.setItem(id, value);
};

const getLocalValue = function (id) {
  return localStorage.getItem(id);
};

let language;
getLocalValue('langSliderValue') == 1 ? (language = 'n') : (language = 'b');

let soundValue = getLocalValue('soundSliderValue');

let signValue = getLocalValue('signSliderValue');

export { language, soundValue, signValue, setLocalValue, getLocalValue };
