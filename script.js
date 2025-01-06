// script.js
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

let currentInput = '';
let operator = null;
let firstOperand = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'AC') {
            clearDisplay();
        } else if (value === 'C') {
            deleteLastDigit();
        } else if (value === 'square') {
            calculateSquare();
        } else if (value === '%') {
            calculateModulo();
        } else if (value === '=') {
            calculateResult();
        } else if (['+', '-', '*', '/'].includes(value)) {
            handleOperator(value);
        } else {
            appendToDisplay(value);
        }
    });
});

function appendToDisplay(value) {
    currentInput += value;
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    operator = null;
    firstOperand = null;
    display.value = '';
}

function deleteLastDigit() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
}

function calculateSquare() {
    if (currentInput !== '') {
        const num = parseFloat(currentInput);
        const result = num * num;
        display.value = result;
        currentInput = result.toString();
    }
}

function calculateModulo() {
    if (currentInput !== '') {
        const num = parseFloat(currentInput);
        const result = num / 100;
        display.value = result;
        currentInput = result.toString();
    }
}

function handleOperator(op) {
    if (currentInput !== '') {
        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
        } else {
            calculateResult();
        }
        operator = op;
        currentInput = '';
    }
}

function calculateResult() {
    if (firstOperand !== null && operator !== null && currentInput !== '') {
        const secondOperand = parseFloat(currentInput);
        let result;
        switch (operator) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                result = firstOperand / secondOperand;
                break;
            default:
                result = 'Error';
        }
        display.value = result;
        currentInput = result.toString();
        firstOperand = null;
        operator = null;
    }
}