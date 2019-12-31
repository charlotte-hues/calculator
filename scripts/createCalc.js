function add(a, b) { return a + b;};
function subtract(a, b) { return a - b;};	
function multiply(a, b) { return a * b;};
function divide(a, b) {	return a / b;};



// BUTTONS - Done like this to give each button an id that isn't a number or a symbol so it can be styled with css if wanted.

const clearButton = {id: 'clear', text: 'c'};
const clearAllButton = {id: 'clearAll', text: 'ce'};

const equalsButton = {id: 'equals', text: '='};
const addButton = {id: 'add', text: '+'};
const subtractButton = {id: 'subtract', text: '-'};
const multiplyButton = {id: 'multiply', text: 'x'};
const divideButton = {id: 'divide', text: '/'};
const backButton = {id: 'backspace', text: '<'};
const swapButton = {id: 'swap', text: '+/-'};

const decimalButton = {id: 'decimal', text: '.'};
const zeroButton = {id: 'zero', text: '0'};
const oneButton = {id: 'one', text: '1'};
const twoButton = {id: 'two', text: '2'};
const threeButton = {id: 'three', text: '3'};
const fourButton = {id: 'four', text: '4'};
const fiveButton = {id: 'five', text: '5'};
const sixButton = {id: 'six', text: '6'};
const sevenButton = {id: 'seven', text: '7'};
const eightButton = {id: 'eight', text: '8'};
const nineButton = {id: 'nine', text: '9'};

const buttons   = [ swapButton,     clearAllButton, clearButton,    backButton,
                    sevenButton,    eightButton,    nineButton,     divideButton,
                    fourButton,     fiveButton,     sixButton,      multiplyButton,
                    oneButton,      twoButton,      threeButton,    subtractButton,
                    zeroButton,     decimalButton,  equalsButton,   addButton  ];

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

const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const display = document.querySelector('#display');
const resultDisplay = document.querySelector('#result');

let currentValue = '';
let displayValue = '';
let operator;
let count = 0;
const numbersArr = [];
const operationsArr = [];

numbers.forEach(button => {
    button.addEventListener('click', event => {
        displayValue = displayValue + event.target.innerHTML;
        display.innerHTML = displayValue;
        currentValue = currentValue + event.target.innerHTML;
        numbersArr[count] = currentValue;
        resultDisplay.innerHTML = operate(numbersArr, operationsArr);
    })
});;

operators.forEach(button => {
    button.addEventListener('click', event => {
        displayValue = displayValue + event.target.innerHTML;
        display.innerHTML = displayValue;
        operationsArr[count] = event.target.id;
        count++;
        currentValue = '';
    })
});

document.querySelector('#equals').addEventListener('click', event => { 
    count = count-1;
    resultDisplay.innerHTML = operate(numbersArr, operationsArr);
});

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