const numbersContainer = document.querySelector("#numbersContainer");

function createNumbers() {
    for (let i=9; i>0; i--) {
        let numberButton = document.createElement('button');
        numbersContainer.appendChild(numberButton);
        numberButton.classList.add('number');
        numberButton.id = (i);
        numberButton.innerHTML = i;
    }
}


const buttonsContainer = document.querySelector("#buttonsContainer");
let functions = [ '/', 'x', '-', '+', '=' ]



function createFunctions(item) {
    let functionButton = document.createElement('button');
    buttonsContainer.appendChild(functionButton);
    functionButton.classList.add('functions');
    functionButton.id = item;
    functionButton.innerHTML = item;
}

// createNumbers();
functions.forEach(createFunctions);
