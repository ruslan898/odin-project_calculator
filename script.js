const displayBox = document.querySelector('.display-box');
const numbersBox = document.querySelector('.numbers-box');
const buttons = document.querySelectorAll('.btn');
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
let num1;
let num2;
let operator;

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
  return +num1 / +num2;
}