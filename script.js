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


// OPERATORS EVENT LISTENERS
let operatorButtons = document.querySelectorAll('#operator');

    for(let i of Array.from(operatorButtons)){
        i.addEventListener('click', () =>{
            // if user's trying to do a multiple operation(5*3-5/4)
            if (currentOperatorSymbol != null && currentOperator != i.textContent){

                // check for message outputted when user divides something by 0
                checkDivideBy0();

                equalButton = document.querySelector('#equals')

                updatedOperatorSymbol = i.textContent;

                multipleOperation = true;
                equalButton.dispatchEvent(new Event("click"));
                currentOperatorSymbol = i.textContent;
            }
            else{
            currentOperatorSymbol = i.textContent;
                    document.querySelector('#display p').innerHTML += ' '+ currentOperatorSymbol + ' ';
            }
    })};

// NUMBERS EVENT LISTENERS
numbers = document.querySelectorAll('#number');

    for (let i of Array.from(numbers)){
        i.addEventListener('click', () =>{

            // check for message outputted when user divides something by 0
            checkDivideBy0();

            // if delete was used with 2 spaces at a time, this compensates with + ' ' to maintain indentation
            if (displayValue[displayValue.length - 1] == '+' || displayValue[displayValue.length - 1] == '-' || displayValue[displayValue.length - 1] == '*' || displayValue[displayValue.length - 1] == '/'){
                number = i.textContent;
                document.querySelector('#display p').innerHTML == '0'? document.querySelector('#display p').innerHTML = number : document.querySelector('#display p').innerHTML += ' ' + number;
                displayValue = document.querySelector('#display p').innerHTML;
            }
            else{
                number = i.textContent;
                document.querySelector('#display p').innerHTML == '0'? document.querySelector('#display p').innerHTML = number : document.querySelector('#display p').innerHTML += number;
                displayValue = document.querySelector('#display p').innerHTML;
            }
        })
    }

// CLEAR EVENT LISTENER
clearButton.addEventListener('click', () =>{
    document.querySelector('#display p').innerHTML = '0';
    document.querySelector('#display div').innerHTML = '';
    displayValue = 0;
    currentOperator = null;
    currentOperatorSymbol = null;
    updatedOperatorSymbol = null;
    numbers = [];
    multipleOperation = false;
})  


// DELETE EVENT LISTENER
deleteButton = document.querySelector('#delete');

deleteButton.addEventListener('click', () =>{

    // if thing to be deleted is an operator
    if (displayValue[displayValue.length - 1] == '+' || displayValue[displayValue.length - 1] == '-' || displayValue[displayValue.length - 1] == '*' || displayValue[displayValue.length - 1]                                        == '/'){
        displayValue = displayValue.slice(0, displayValue.length - 2)
        document.querySelector('#display p').innerHTML = displayValue
    }

    // if it's a number
    else{

        // delete 2 times on 1 click when there is space before number to make user click less
        if (displayValue[displayValue.length - 2] == ' '){
            displayValue = displayValue.slice(0,(displayValue.length - 2))
            document.querySelector('#display p').innerHTML = displayValue
        }

        // else just delete 1 num for click
        else{
            if (displayValue != 0){
                if (displayValue.toString().length > 1){
                    displayValue = displayValue.toString().slice(0,displayValue.toString().length - 1)
                    document.querySelector('#display p').innerHTML = displayValue 
                }
                else{
                    displayValue = '0'
                    document.querySelector('#display p').innerHTML = displayValue
                }
            }
        }
    }
})


// Get logical operator function (changing 'currentOperator' variable value)
const getOperator = () =>{
    (currentOperatorSymbol == '+')? currentOperator = 'add' :
    (currentOperatorSymbol == '-')? currentOperator = 'subtract' :
    (currentOperatorSymbol == '*')? currentOperator = 'multiply' :
    currentOperator = 'divide'
}

// EQUAL EVENT LISTENER
equalButton = document.querySelector('#equals')

equalButton.addEventListener('click', () =>{

    // check for message outputted when user divides something by 0
    checkDivideBy0();

    if(displayValue != 0){
        if(searchForOperators() != false){
            // Get array of numbers before and after operator ([0] and [1])
            numbers = document.querySelector('#display p').innerHTML.split(`${currentOperatorSymbol}`);
            numbers[0] = numbers[0].trim();
            numbers[1] = numbers[1].trim();

            // Update 'currentOperator' variable value
            getOperator();
            const operationResult = operate(currentOperator, numbers[0], numbers[1])

            document.querySelector('#display div').innerHTML = displayValue + ' =';
            document.querySelector('#display p').innerHTML = operationResult;

            if (multipleOperation){
                document.querySelector('#display p').innerHTML = operationResult + ' ' + `${updatedOperatorSymbol}` + ' '
                document.querySelector('#display div').innerHTML = displayValue + ' =';
                multipleOperation = false;
            }
            displayValue = operationResult;
        }
        else{
            if (updatedOperatorSymbol != null){
                displayValue = displayValue + ' ' + updatedOperatorSymbol + ' '
                document.querySelector('#display p').innerHTML = displayValue;
            }
        }
    }
})