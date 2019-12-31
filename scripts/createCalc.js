function add(a, b) { return a + b;};
function subtract(a, b) { return a - b;};	
function multiply(a, b) { return a * b;};
function divide(a, b) {	return a / b;};

// BUTTONS - Done like this to give each button an id that isn't a number or a symbol so it can be individually styled with css.

const clearButton = {id: 'clear', text: 'clr'};
const backButton = {id: 'backspace', text: '<'};
const swapButton = {id: 'swap', text: '+/-'};

const addButton = {id: 'add', text: '+'};
const subtractButton = {id: 'subtract', text: '-'};
const multiplyButton = {id: 'multiply', text: 'x'};
const divideButton = {id: 'divide', text: '/'};
const equalsButton = {id: 'equals', text: '='};

const decimalButton = {id: 'decimal', text: '.'};
const zeroButton = {id: 'zero', text: '0'};
const zero2Button = {id: 'zero2', text: '00'};
const oneButton = {id: 'one', text: '1'};
const twoButton = {id: 'two', text: '2'};
const threeButton = {id: 'three', text: '3'};
const fourButton = {id: 'four', text: '4'};
const fiveButton = {id: 'five', text: '5'};
const sixButton = {id: 'six', text: '6'};
const sevenButton = {id: 'seven', text: '7'};
const eightButton = {id: 'eight', text: '8'};
const nineButton = {id: 'nine', text: '9'};

const buttons   = [ clearButton,    backButton,     swapButton,     addButton,
                    sevenButton,    eightButton,    nineButton,     divideButton,
                    fourButton,     fiveButton,     sixButton,      multiplyButton,
                    oneButton,      twoButton,      threeButton,    subtractButton,
                    zeroButton,     zero2Button,    decimalButton,  equalsButton,   ];

                    
const buttonsContainer = document.querySelector("#buttonsContainer");

function createButtons(item) {
    let functionButton = document.createElement('button');
    buttonsContainer.appendChild(functionButton);
    functionButton.id = item.id;
    functionButton.innerHTML = item.text;

    if (functionButton.innerHTML >= 0 && functionButton.innerHTML <= 9 || functionButton.id === 'decimal' ) {
        functionButton.classList.add('numbers');
    } else { functionButton.classList.add('operators');
    }
}

buttons.forEach(createButtons);

const display = document.querySelector('#display');
const resultDisplay = document.querySelector('#result');
const numbersArr = [];
const operationsArr = [];
let currentValue = '';
let displayValue = '';
let operator;
let count = 0;


function operate(numbersArr, operationsArr) {
    let prevAnswer = Number(numbersArr[0]);
    let operator = window[operationsArr[0]];
    for (let i=0; i<numbersArr.length-1; i++) {
        operator = window[operationsArr[i]];
        prevAnswer = operator(prevAnswer, Number(numbersArr[i+1]));
        console.log(prevAnswer);
    }
    return prevAnswer;
 };


const numbers = document.querySelectorAll('.numbers');
numbers.forEach(button => {
    button.addEventListener('click', event => {
        displayValue = displayValue + event.target.innerHTML;
        display.innerHTML = displayValue;
        currentValue = currentValue + event.target.innerHTML;
        numbersArr[count] = currentValue;
        resultDisplay.innerHTML = operate(numbersArr, operationsArr);
    })
});;

const operators = document.querySelectorAll('.operators');
operators.forEach(button => {
    button.addEventListener('click', event => {
        displayValue = displayValue + event.target.innerHTML;
        (displayValue === '=') ? displayValue = '' : display.innerHTML = displayValue;
        operationsArr[count] = event.target.id;
        count++;
        currentValue = '';
    })
});

document.querySelector('#equals').addEventListener('click', event => { 
    count = count-1;
    if (numbersArr.length < 1) return;
    let newResult = operate(numbersArr, operationsArr);
    resultDisplay.innerHTML = newResult;
    let tempDisplay = displayValue;
    display.innerHTML = tempDisplay;
    displayValue = newResult;
});