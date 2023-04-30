import Button from './component/Button.js';

const arrKeys = [['Backquote', '`', 'Ё'], ['Digit1', '1'], ['Digit2', '2'], ['Digit3', '3'], ['Digit4', '4'], ['Digit5', '5'], ['Digit6', '6'], ['Digit7', '7'], ['Digit8', '8'], ['Digit9', '9'], ['Digit0', '0'], ['NumpadSubtract', '-'], ['Equal', '='], ['Backspace', 'Backspace'],
  ['Tab', 'Tab'], ['KeyQ', 'Q', 'Й'], ['KeyW', 'W', 'Ц'], ['KeyE', 'E', 'У'], ['KeyR', 'R', 'К'], ['KeyT', 'T', 'Е'], ['KeyY', 'Y', 'Н'], ['KeyU', 'U', 'Г'], ['KeyI', 'I', 'Ш'], ['KeyO', 'O', 'Ў'], ['KeyP', 'P', 'З'], ['BracketLeft', '[', 'Х'], ['BracketRight', ']', "'"], ['Backslash', '\\'], [46, 'DEL'],
  ['CapsLock', 'Caps Lock'], ['KeyA', 'A', 'Ф'], ['KeyS', 'S', 'Ы'], ['KeyD', 'D', 'В'], ['KeyF', 'F', 'А'], ['KeyG', 'G', 'П'], ['KeyH', 'H', 'Р'], ['KeyJ', 'J', 'О'], ['KeyK', 'K', 'Л'], ['KeyL', 'L', 'Д'], ['Semicolon', ';', 'Ж'], ['Quote', "'", 'Э'], ['Enter', 'ENTER'],
  ['ShiftLeft', 'Shift'], ['KeyZ', 'Z', 'Я'], ['KeyX', 'X', 'Ч'], ['KeyC', 'C', 'С'], ['KeyV', 'V', 'М'], ['KeyB', 'B', 'І'], ['KeyN', 'N', 'Т'], ['KeyM', 'M', 'Ь'], ['NumpadDecimal', ',', 'Б'], ['Period', '.', 'Ю'], ['Slash', '/'], ['ShiftRight', 'Shift'], ['ArrowUp', '&#9650;'],
  ['ControlLeft', 'Ctrl'], ['MetaLeft', 'Win'], ['AltLeft', 'Alt'], ['Space', '&nbsp;'], ['AltRight', 'Alt'], ['ControlRight', 'Ctrl'], ['ArrowLeft', '&#9668;'], ['ArrowDown', '&#9660;'], ['ArrowRight', '&#9658;']];
let ctrl = false;
let shift = false;
function getKeyboard() {
  const keyBoard = document.createElement('div');
  const input = document.createElement('textarea');
  const paragraph = document.createElement('p');
  const lng = checkLocalStorage();
  input.setAttribute('autofocus', 'autofocus');
  keyBoard.classList.add('keyboard');
  arrKeys.forEach((el) => {
    const button = new Button(el, lng);
    keyBoard.append(button.getButton());
  });
  paragraph.textContent = 'The keyboard layout is switched with "ctrl" + "shift" keys.';
  document.body.prepend(paragraph);
  document.body.prepend(keyBoard);
  document.body.prepend(input);
  document.addEventListener('keydown', keyDown);
  document.addEventListener('keyup', keyUp);
}

function checkLocalStorage() {
  const storage = localStorage.getItem('virtual-keyboard');
  return storage ? storage : "en";
}

function changeLanguage() {
  const lng = checkLocalStorage();
  let ind = null;
  if (lng === 'en') {
    ind = 2;
    localStorage.setItem('virtual-keyboard', 'by');
  } else {
    ind = 1;
    localStorage.setItem('virtual-keyboard', 'en');
  }
  for (let elKey of arrKeys) {
    if (elKey[2] == undefined) continue;
    let key = document.querySelector(`[value=${elKey[0]}]`);
    key.textContent = elKey[ind];
  }

}

function keyDown(e) {
  document.querySelectorAll('.key').forEach(el => {
      if(el.value == e.code || el.value == e.keyCode) {
          el.classList.add('key-down');
      }
  });
  if (e.code == 'ControlLeft' || e.code == 'ControlRight') ctrl = true;
  if (e.code == 'ShiftLeft' || e.code == 'ShiftRight') shift = true;
}

function keyUp(e) {
  if (ctrl && shift) {
    changeLanguage();
    ctrl = false;
    shift = false;
  }
  document.querySelectorAll('.key').forEach(el => {
      if(el.value == e.code || el.value == e.keyCode) {
        el.classList.remove('key-down');
      }
  });
}

getKeyboard();
