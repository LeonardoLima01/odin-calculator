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

