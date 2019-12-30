// BUTTONS - done like this to give each button a an id that isn't a number or a symbol.

const clearButton = {id: 'clear', text: 'c'};
const clearAllButton = {id: 'clearAll', text: 'ce'};

const equalsButton = {id: 'equals', text: '='};
const addButton = {id: 'add', text: '+'};
const subtractButton = {id: 'subtract', text: '-'};
const multiplyButton = {id: 'multiply', text: 'x'};
const divideButton = {id: 'divide', text: '/'};
const backButton = {id: 'backspace', text: '<'};
const swapButton = {id: 'swap', text: '+-'};

const decimalButton = {id: 'decimal', text: 'x'};
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

const buttonsContainer = document.querySelector("#buttonsContainer");

const functions = [ swapButton,     clearAllButton, clearButton,    backButton,
                    sevenButton,    eightButton,    nineButton,     divideButton,
                    fourButton,     fiveButton,     sixButton,      multiplyButton,
                    oneButton,      twoButton,      threeButton,    subtractButton,
                    zeroButton,     decimalButton,  equalsButton,   addButton  ];

function createFunctions(item) {
    let functionButton = document.createElement('button');
    buttonsContainer.appendChild(functionButton);
    functionButton.id = item.id;
    functionButton.innerHTML = item.text;

    if (functionButton.innerHTML >= 0 && functionButton.innerHTML <= 9 || functionButton.id === 'decimal' ) {
        functionButton.classList.add('numbers');
    } else { functionButton.classList.add('functions');
    }
}

functions.forEach(createFunctions);
