import { setLocalValue, getLocalValue } from './components/settings.js';

const cog = document.querySelector('.cog-img');
let open = false;

const settingsWindow = document.getElementById('settings-window');

let langSliderValue = parseInt(getLocalValue('--langSlider')) || 0;
let soundSliderValue = parseInt(getLocalValue('--soundSlider')) || 0;
let signSliderValue = parseInt(getLocalValue('--signSlider')) || 0;

setLocalValue('--langSlider', langSliderValue);
setLocalValue('--soundSlider', soundSliderValue);
setLocalValue('--signSlider', signSliderValue);

document.documentElement.style.setProperty('--langSlider', langSliderValue);
document.documentElement.style.setProperty('--soundSlider', soundSliderValue);
document.documentElement.style.setProperty('--signSlider', signSliderValue);

document.querySelector('.logo').addEventListener('click', () => {
  window.location = 'https://www.statped.no/';
});

window.addEventListener('click', function (event) {
  if (event.target.id == 'settings' || event.target == cog) {
    if (open) {
      settingsWindow.classList.add('hidden');
      open = false;
    } else {
      settingsWindow.classList.remove('hidden');
      open = true;
    }
  } else if (event.target.id === 'settings-window') {
    open ? settingsWindow.classList.add('hidden') : null;
    open = false;
  }

  if (event.target.id === 'lang-bok' || event.target.id === 'lang-ny') {
    if (document.getElementById('lang-bok').checked === true) {
      langSliderValue = 0;
      toggleSlider(0, '--langSlider');
    }
    if (document.getElementById('lang-ny').checked === true) {
      langSliderValue = 1;
      toggleSlider(1, '--langSlider');
    }
  }
  if (event.target.id === 'sound') {
    if (soundSliderValue === 0) {
      soundSliderValue = 1;
      toggleSlider(1, '--soundSlider');
    } else {
      soundSliderValue = 0;
      toggleSlider(0, '--soundSlider');
    }
  }
  if (event.target.id === 'sign') {
    if (signSliderValue === 0) {
      signSliderValue = 1;
      toggleSlider(1, '--signSlider');
      toggleSlider(1, '--soundSlider');
    } else {
      signSliderValue = 0;
      toggleSlider(0, '--signSlider');
      toggleSlider(0, '--soundSlider');
    }
  }
});

window.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    let target = document.getElementById(e.target.id);
    if (
      e.target.id === 'lang' ||
      e.target.id === 'sound' ||
      e.target.id === 'sign'
    ) {
      target.checked === true
        ? (target.checked = false)
        : (target.checked = true);
    }

    if (e.target.id === 'lang-bok' || e.target.id === 'lang-ny') {
      if (document.getElementById('lang-bok').checked === true) {
        langSliderValue = 0;
        toggleSlider(0, '--langSlider');
      }
      if (document.getElementById('lang-ny').checked === true) {
        langSliderValue = 1;
        toggleSlider(1, '--langSlider');
      }
    }
    if (e.target.id === 'sound') {
      if (soundSliderValue === 0) {
        soundSliderValue = 1;
        toggleSlider(1, '--soundSlider');
      } else {
        soundSliderValue = 0;
        toggleSlider(0, '--signSlider');
      }
    }
    if (e.target.id === 'sign') {
      if (signSliderValue === 0) {
        signSliderValue = 1;
        toggleSlider(1, '--signSlider');
      } else {
        signSliderValue = 0;
        toggleSlider(0, '--signSlider');
      }
    }
  }
});

document.getElementById('lang-bok').addEventListener('change', function () {
  if (this.checked === true) {
    langSliderValue = 0;
    toggleSlider(0, '--langSlider');
  }
});
document.getElementById('lang-ny').addEventListener('change', function () {
  if (this.checked === true) {
    langSliderValue = 1;
    toggleSlider(1, '--langSlider');
  }
});

function toggleSlider(target, slider) {
  document.documentElement.style.setProperty(slider, target);
  if (target === 1) {
    setLocalValue(slider, target);
  } else {
    setLocalValue(slider, target);
  }
}

document.getElementById('settingsButton').addEventListener('click', () => {
  settingsWindow.classList.add('hidden');
  open = false;
});

if (langSliderValue === 1) {
  document.getElementById('lang-ny').checked = true;
} else {
  document.getElementById('lang-bok').checked = true;
}

if (soundSliderValue === 1) {
  document.getElementById('sound').checked = true;
}

if (signSliderValue === 1) {
  document.getElementById('sign').checked = true;
}
