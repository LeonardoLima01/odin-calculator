const add = (x,y) => +x + +y % 1 == 0 ? +x + +y: (+x + +y).toFixed(2);;

const subtract = (x,y) => x - y % 1 == 0 ? x - y: (x - y).toFixed(2);

const multiply = (x,y) => x * y % 1 == 0 ? x * y: (x * y).toFixed(2);

const divide = (x,y) =>{
    if (y != 0){
        return x / y % 1 == 0 ? x / y: (x / y).toFixed(2);
    }
    else{
        return 'undefined >.<'
    }
}

const operate = (operator,x,y) =>{
    return operator == 'add'? add(x,y):
    operator == 'subtract'? subtract(x,y):
    operator == 'multiply'? multiply(x,y):
    divide(x,y)
}


// Global Variables
let displayValue = document.querySelector('#display p').innerHTML;
let numbers = [];
let multipleOperation = false;
let currentOperator = null;
let currentOperatorSymbol = null;
let updatedOperatorSymbol = null;

// Look for operators on calculator display
const searchForOperators = () =>{

    for (let i = 0; i <= document.querySelector('#display p').innerHTML.length - 1; i++){
        if (document.querySelector('#display p').innerHTML[i] == '+' || document.querySelector('#display p').innerHTML[i] == '-' || document.querySelector('#display p').innerHTML[i] == '*' || document.querySelector('#display p').innerHTML[i] == '/'){
            return true;
        }
    }
    return false;
}

// Look for '.' on display value
const searchForDot = () =>{
    let count = 0;

    for (let i = 0; i <= document.querySelector('#display p').innerHTML.length - 1; i++){

        if (document.querySelector('#display p').innerHTML[i] == '.'){
            count++;
        }
    }
    return count;
}

clearButton = document.querySelector('#clear')

// If user tries to divide something by zero
const checkDivideBy0 = ()=>{
    if (displayValue == 'undefined >.<'){
        // reset if user tries to do math with the message
        clearButton.dispatchEvent(new Event("click"));
    }
}

// Dot ('.') EVENT LISTENER
const dotButton = document.querySelector('#dot')

dotButton.addEventListener('click', () =>{

    // check for message outputted when user divides something by 0
    checkDivideBy0();

    // if user's inputting after an operator (5 / ''<-- here) then reset dot condition
    if(displayValue.split(`${currentOperatorSymbol}`)[1] != undefined && displayValue.split(`${currentOperatorSymbol}`)[1] != ''){
        if(searchForDot() <= 1){
            displayValue += '.'
            document.querySelector('#display p').innerHTML = displayValue;
        }
    }
    // if user is inputting before operator
    else{
        if(searchForDot() == 0){
            displayValue += '.'
            document.querySelector('#display p').innerHTML = displayValue;
        }
    }
})