class Button {
  constructor(arr, lng) {
    const [key, en, by = null] = arr;
    this.key = key;
    this.en = en;
    this.by = by;
    this.lng = lng;
  }

  keyManag = ["Backspace","Tab","DEL","Caps Lock","ENTER","Shift","Ctrl","Win","Alt","&#9650;","&#9668;","&#9660;","&#9658;"];
  arrows = ["&#9650;", "&#9668;", "&#9660;", "&#9658;", "&nbsp;"];

  getButton() {
    const button = document.createElement('button');
    button.classList.add('key');
    button.setAttribute('value', this.key);
    button.addEventListener('click', this.print.bind(this));
    if (this.keyManag.includes(this.en)) button.classList.add('key-manage');
    if (this.arrows.includes(this.en)) {
      button.innerHTML = this.en;
    } else if (this.lng === 'en') {
      button.textContent = this.en;
    } else {
      this.by ? button.textContent = this.by : button.textContent = this.en;
    }
    
    switch (this.en) {
      case "Backspace": button.classList.add('backspace');
      break;
      case "Tab": button.classList.add('tab');
      break;
      case "Caps Lock": button.classList.add('caps-lock', 'caps-lock-light');
      break;
      case "ENTER": button.classList.add('enter');
      break;
      case "Shift": button.classList.add('shift');
      break;
      case "Ctrl": button.classList.add('ctrl');
      break;
      case "&nbsp;": button.classList.add('space');
  }
    return button;
  }

  print(e) {
    const field = document.querySelector('textarea');
    let cursorPosition = field.selectionStart;
    const capsLock = document.querySelector('.caps-lock');
    const shift = document.querySelectorAll('.shift');
    function insertChar(char) {
      const charCase = capsLock.classList.contains('caps-lock-active') ||
        shift[0].classList.contains('key-down') ||
        shift[1].classList.contains('key-down') ? char : char.toLowerCase();
      const newInput = field.value.split('');
      newInput.splice(cursorPosition, 0, charCase);
      field.value =  newInput.join('');
      if (char === "    ") {
        field.setSelectionRange(cursorPosition + 4, cursorPosition + 4);
      } else {
        field.setSelectionRange(cursorPosition + 1, cursorPosition +  1);
      }
      field.focus();
    }
    if(!e.currentTarget.classList.contains('key-manage') || 
      e.target.value === "ArrowUp" ||
      e.target.value === "ArrowLeft" ||
      e.target.value === "ArrowDown" ||
      e.target.value === "ArrowRight" ||
      e.target.value === "Space") { insertChar(e.target.textContent); }
    if (e.target.value === "Enter") { insertChar("\n"); }
    if (e.target.value === "Tab") { insertChar("    "); }
    if (e.target.value === "Backspace") {
      if (cursorPosition > 0) {
        const newInput = field.value.split('');
        newInput.splice(field.selectionStart - 1, 1);
        field.value = newInput.join('');
        field.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
        field.focus();
      }
    }
    if (e.target.value === "46") {
      if (cursorPosition < field.value.length) {
        const newInput = field.value.split('');
        newInput.splice(field.selectionStart, 1);
        field.value = newInput.join('');
        field.setSelectionRange(cursorPosition , cursorPosition);
        field.focus();
      }
    }
    if (e.target.value === "CapsLock") {
      if (e.target.classList.contains('caps-lock-light')) {
        e.target.classList.remove('caps-lock-light');
        e.target.classList.add('caps-lock-active');
      } else {
        e.target.classList.remove('caps-lock-active');
        e.target.classList.add('caps-lock-light');
      }
    }
  }
}

export default Button;
