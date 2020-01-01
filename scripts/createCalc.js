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
let numbersArr = [];
let operationsArr = [];
let fullSum = '';
let currentValue = '';
let totalValue = '';
let count = 0;
let hasResult = false;

function clear() {
    numbersArr = [];
    operationsArr = [];
    currentValue = '';
    totalValue = '';
    fullSum = '';
    count = 0;
    display.innerHTML = totalValue;
    resultDisplay.innerHTML = '';
};

function resultCheck(event) {
    if (!hasResult) {addNumber(event.target.id, event.target.innerHTML)}
    else {
        clear()
        addNumber(event.target.id, event.target.innerHTML) 
    }    
};

function addNumber(id, innerHTML) {
    if (id === 'decimal' && currentValue.toString().includes('.')) return;
    hasResult = false;
    currentValue = currentValue + innerHTML;
    fullSum = fullSum + innerHTML;
    display.innerHTML = fullSum;
    numbersArr[count] = currentValue;
    totalValue = operate(numbersArr, operationsArr);
    (isNaN(totalValue)) ? resultDisplay.innerHTML = '' : resultDisplay.innerHTML = totalValue;
    console.log('current value: ' + currentValue);

}

function addOperator(event) {
    if (event.target.id === 'swap' || event.target.id === 'backspace') return;
    hasResult = false;
    currentValue = currentValue + event.target.innerHTML;
    fullSum = fullSum + event.target.innerHTML;
    (currentValue === '=') ? totalValue = '' :  display.innerHTML = fullSum;
    operationsArr[count] = event.target.id;
    count++;
    currentValue = '';
    console.log('count: ' + count);
}

function swap() {
    if (hasResult) {
        hasResult = false;
        currentValue = totalValue * -1;
        fullSum = currentValue;
        count = 0;
        numbersArr = [];
        operationsArr = [];
        numbersArr[count] = currentValue;
        resultDisplay.innerHTML = '';
        display.innerHTML = fullSum;
    } else { 
            currentValue = '-';
            fullSum = '-';
    }
};

function backspace() {
    if (hasResult) {clear();}
    if (fullSum.endsWith('+') || fullSum.endsWith('-') || fullSum.endsWith('x') || fullSum.endsWith('/')) {
        count = count -1;
        console.log('minus count')
        fullSum = fullSum.substring(0, fullSum.length -1);
    } else {
        fullSum = fullSum.substring(0, fullSum.length -1);
        currentValue = currentValue.substring(0, currentValue.length -1);
        numbersArr[count] = currentValue;
    }
    totalValue = operate(numbersArr, operationsArr)
    display.innerHTML = fullSum;
    isNaN(totalValue) ? resultDisplay.innerHTML = '' : resultDisplay.innerHTML = totalValue;
};

function operate(numbersArr, operationsArr) {
    let prevAnswer = Number(numbersArr[0]);
    let operator = window[operationsArr[0]];
    for (let i=0; i<count; i++) {
        operator = window[operationsArr[i]];
        prevAnswer = operator(prevAnswer, Number(numbersArr[i+1]));
    }
    return prevAnswer;
 };

 function equals() {
    count = count-1;
    if (numbersArr.length < 1) return;
    if (totalValue === Infinity || isNaN(totalValue)) { clear(); }
    else {
        totalValue = operate(numbersArr, operationsArr)
        resultDisplay.innerHTML = totalValue;
        display.innerHTML = fullSum;
        currentValue = '';
        fullSum = totalValue;
        hasResult = true;
    };
    count = 0;
    numbersArr = []
    numbersArr[0] = totalValue;
    operationsArr = [];
    return totalValue;
 };

const numbers = document.querySelectorAll('.numbers');
numbers.forEach(button => {button.addEventListener('click', event => resultCheck(event))});

const operators = document.querySelectorAll('.operators');
operators.forEach(button => { button.addEventListener('click', event => addOperator(event))});

document.querySelector('#equals').addEventListener('click', event => equals());

document.querySelector('#clear').addEventListener('click', event => clear());

document.querySelector('#swap').addEventListener('click', event => swap());

document.querySelector('#backspace').addEventListener('click', event => backspace());
