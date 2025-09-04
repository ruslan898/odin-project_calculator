const displayBox = document.querySelector('.display-box');
const numbersBox = document.querySelector('.numbers-box');
const buttons = document.querySelectorAll('.btn');
const operatorBtns = document.querySelectorAll('.operator-btn');
const backspaceBtn = document.querySelector('#backspace');
const clearBtn = document.querySelector('#clear');
const signBtn = document.querySelector('#sign');
const divideBtn = document.querySelector('#divide');
const multiplyBtn = document.querySelector('#multiply');
const minusBtn = document.querySelector('#minus');
const plusBtn = document.querySelector('#plus');
const equalsBtn = document.querySelector('#equals');
const zeroBtn = document.querySelector('#zero');
const pointBtn = document.querySelector('#point');
let num1 = '';
let num2 = '';
let operator = '';


// Basic math operators functions
function add(num1, num2) {
  return +num1 + +num2;
}
function subtract(num1, num2) {
  return +num1 - +num2;
}
function multiply(num1, num2) {
  return +num1 * +num2;
}
function divide(num1, num2) {
  if (+num2 === 0) {
    return "Can't divide by zero"
  }
  return (+num1 / +num2 % 2 === 0) ? +num1 / +num2 : (+num1 / +num2).toFixed(2);
}

// Calculation handler function
function operate(operator, num1, num2) {
  if (operator === 'plus') {
    return add(num1, num2);
  }
  if (operator === 'minus') {
    return subtract(num1, num2);
  }
  if (operator === 'multiply') {
    return multiply(num1, num2);
  }
  if (operator === 'divide') {
    return divide(num1, num2);
  }
}

// Display result on screen
function displayInput(input) {
  if (displayBox.textContent.length < 9) {
    displayBox.textContent += input;
  }
}

// Update variable values
function updateVar(value, varName) {
  if (num1.length < 9) {
    if (varName === 'num1') {
      num1 += value;
    }
  }
  if (num2.length < 9) {
    if (varName === 'num2') {
      num2 += value;
    }
  }
  if (varName === 'operator') {
    operator = value;
  }
}

// Clear values
function clear(...clearItems) {
  if (clearItems.includes('display')) {
    displayBox.textContent = '';
  }
  if (clearItems.includes('num1')) {
    num1 = '';
  }
  if (clearItems.includes('num2')) {
    num2 = '';
  }
  if (clearItems.includes('operator')) {
    operator = '';
  }
}

// Add and remove active class from buttons
function addActiveClass(buttons, activeBtn) {
  buttons.forEach((btn) => {
    btn.classList.remove('active');
  });
  activeBtn.classList.add('active');
}
function removeActiveClass(buttons) {
  buttons.forEach((btn) => {
    btn.classList.remove('active');
  })
}

// Remove last char
function backspaceFn() {
  let currentText = displayBox.textContent;
  currentText = currentText.slice(0, -1);
  clear('display');
  displayInput(currentText);
  if (!operator) {
    num1 = currentText;
  } else {
    num2 = currentText;
  }
}

function changeNumSign(num) {
  return num *= -1;
}


numbersBox.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn')) {
    const currentInput = e.target.textContent;
    if (equalsBtn.dataset.active === 'true') {
      equalsBtn.dataset.active = 'false';
      clear('display', 'num1', 'num2', 'operator');
    }
    if (operator && !num2) {
      clear('display');
      removeActiveClass(buttons)
    }
    if (!operator) {
      displayInput(currentInput);
      updateVar(currentInput, 'num1');
    } else {
      displayInput(currentInput);
      updateVar(currentInput, 'num2');
    }
  }
});

zeroBtn.addEventListener('click', () => {
  if (equalsBtn.dataset.active === 'true') {
    equalsBtn.dataset.active = 'false';
    clear('display', 'num1', 'num2', 'operator');
  }
  if (operator && !num2) {
    clear('display');
    removeActiveClass(buttons);
  }
  if (!operator) {
    displayInput('0');
    updateVar('0', 'num1');
  } else {
    displayInput('0');
    updateVar('0', 'num2');
  }
})

operatorBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (num1 && num2) {
      clear('display');
      displayInput(operate(operator, num1, num2));
      num1 = displayBox.textContent;
      clear('operator', 'num2');
      if (btn.classList.contains('active')) {
        removeActiveClass(buttons);
        clear('operator');
      } else {
        addActiveClass(operatorBtns, btn);
      }
      updateVar(btn.id, 'operator');
    } else if (num1) {
      updateVar(btn.id, 'operator');
      if (btn.classList.contains('active')) {
        removeActiveClass(buttons);
        clear('operator');
      } else {
        addActiveClass(operatorBtns, btn);
      }
    }

  });
});


equalsBtn.addEventListener('click', () => {
  if (num1 && operator && num2) {
    equalsBtn.dataset.active = 'true';
    clear('display');
    removeActiveClass(buttons);
    displayInput(operate(operator, num1, num2))
  }
})

clearBtn.addEventListener('click', () => {
  clear('display', 'num1', 'num2', 'operator');
  removeActiveClass(operatorBtns);
})

backspaceBtn.addEventListener('click', () => {
  backspaceFn();
})

signBtn.addEventListener('click', () => {
  if (!equalsBtn.dataset.active || equalsBtn.dataset.active === 'false') {
    clear('display');
    if (!operator) {
      num1 = changeNumSign(num1);
      displayInput(num1);
    } else {
      num2 = changeNumSign(num2);
      displayInput(num2);
    }
  }
})

pointBtn.addEventListener('click', () => {
  if (displayBox.textContent && !(displayBox.textContent.includes('.'))) {
    displayInput('.');
  }
})