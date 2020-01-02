function add(a, b) {return a + b;};
function subtract(a, b) {return a - b;};	
function multiply(a, b) {return a * b;};
function divide(a, b) {return a / b;};
function round(value, decimals) {return Number(Math.round(value+'e'+decimals)+'e-'+decimals);};

// BUTTONS - Done like this to give each button an id that isn't a number or a symbol so it can be individually styled with css.

const clearButton = {id: 'clear', text: 'clr', key: 'Delete'};
const backButton = {id: 'backspace', text: '<', key: 'Backspace'};
const swapButton = {id: 'swap', text: '+/-', key: 'Tab'};

const addButton = {id: 'add', text: '+', key: '+'};
const subtractButton = {id: 'subtract', text: '-', key: '-'};
const multiplyButton = {id: 'multiply', text: '*', key: '*'};
const divideButton = {id: 'divide', text: '/', key: '/'};
const equalsButton = {id: 'equals', text: '=', key: 'Enter'};

const decimalButton = {id: 'decimal', text: '.', key: '.'};
const zeroButton = {id: 'zero', text: '0', key: '0'};
const zero2Button = {id: 'zero2', text: '00'};
const oneButton = {id: 'one', text: '1', key: '1'};
const twoButton = {id: 'two', text: '2', key: '2'};
const threeButton = {id: 'three', text: '3', key: '3'};
const fourButton = {id: 'four', text: '4', key: '4'};
const fiveButton = {id: 'five', text: '5', key: '5'};
const sixButton = {id: 'six', text: '6', key: '6'};
const sevenButton = {id: 'seven', text: '7', key: '7'};
const eightButton = {id: 'eight', text: '8', key: '8'};
const nineButton = {id: 'nine', text: '9', key: '9'};

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
    functionButton.setAttribute('key', item.key);

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

function clearArrays() {
    count = 0;
    numbersArr = [];
    operationsArr = [];
}

function clear() {
    clearArrays();
    currentValue = '';
    totalValue = '';
    fullSum = '';
    display.innerHTML = totalValue;
    resultDisplay.innerHTML = '';
};

function resultCheck(event) {
    if (!hasResult) {addNumber(event.id, event.innerHTML)}
    else {
        clear();
        addNumber(event.id, event.innerHTML); 
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
};

function addOperator(event) {
    const fn = window[event.id];
    if (event.id === 'swap' || event.id === 'backspace') return fn();
    else {
        hasResult = false;
        currentValue = currentValue + event.innerHTML;
        fullSum = fullSum + event.innerHTML;
        (currentValue === '=') ? totalValue = '' :  display.innerHTML = fullSum;
        operationsArr[count] = event.id;
        count++;
        currentValue = '';
        console.log('count: ' + count);
        if (typeof fn === "function") fn();
    } return;
};

function swap() {
    if (hasResult) {
        hasResult = false;
        currentValue = totalValue * -1;
        fullSum = currentValue;
        clearArrays();
        numbersArr[count] = currentValue;
        resultDisplay.innerHTML = '';
        display.innerHTML = fullSum;
    }return;
};

function backspace() {
    if (hasResult) {clear();}
    if (fullSum.endsWith('+') || fullSum.endsWith('-') || fullSum.endsWith('*') || fullSum.endsWith('/')) {
        count = count -1;
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
        totalValue = operator(prevAnswer, Number(numbersArr[i+1]));
        prevAnswer = totalValue;
    }
    return round(totalValue, 2);
 };

function equals() {
    count = count-1;
    if (numbersArr.length < 1) return;
    if (totalValue === Infinity || isNaN(totalValue)) { clear(); }
    else {
        currentValue = '';
        fullSum = totalValue;
        hasResult = true;
    };
    clearArrays();
    numbersArr[0] = totalValue;
    return totalValue;
};

const numbers = document.querySelectorAll('.numbers');
numbers.forEach(button => {button.addEventListener('click', event => resultCheck(event.target))});

const operators = document.querySelectorAll('.operators');
operators.forEach(button => { button.addEventListener('click', event => addOperator(event.target))});

window.addEventListener('keydown', function (e) {
    const button = document.querySelector(`button[key="${e.key}"]`);
    if(!button) return;
    if(button.classList[0] === 'numbers') resultCheck(button); 
    else if(button.classList[0] === 'operators') addOperator(button);     
});
