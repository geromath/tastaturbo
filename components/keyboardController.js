// Her finnes alt som styrer farger på keyboardet. Her er det meningen at mer av tastaturets oppgaver skal inn, slik at task.js ikke er så full av logikk, men heller peker til andre steder der logikken ligger. dette er for å få bedre oversikt. 

const keyboardColors = {
  pinky: '#0000ff',
  ring: '#ff0000',
  long: '#ffff00',
  point: '#00ff00',
};

const pinky = ['1', 'q', 'a', 'z', '0', 'p', 'ø', '-'];
const ring = ['2', 'w', 's', 'x', '9', 'o', 'l' /* TODO: Add . */];
const long = ['3', 'e', 'd', 'c', '8', 'i', 'k', ','];
const point = [
  '4',
  'r',
  'f',
  'v',
  '5',
  't',
  'g',
  'b',
  '6',
  'y',
  'h',
  'n',
  '7',
  'u',
  'j',
  'm',
];

let highlightedKey;

function highlightKey(key) {
  if (pinky.includes(key)) {
    highlightedKey = key;
    document.documentElement.style.setProperty(
      '--highlightColor',
      keyboardColors.pinky
    );
  }
  if (ring.includes(key)) {
    highlightedKey = key;
    document.documentElement.style.setProperty(
      '--highlightColor',
      keyboardColors.ring
    );
  }
  if (long.includes(key)) {
    highlightedKey = key;
    document.documentElement.style.setProperty(
      '--highlightColor',
      keyboardColors.long
    );
  }
  if (point.includes(key)) {
    highlightedKey = key;
    document.documentElement.style.setProperty(
      '--highlightColor',
      keyboardColors.point
    );
  }
  highlightedKey = document.querySelector('.' + key);
  highlightedKey.classList.add('key--highlight');
}

export { highlightKey, highlightedKey };
