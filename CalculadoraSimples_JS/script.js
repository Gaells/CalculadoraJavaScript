let runningTotal = 0;
let buffer = "0";
let operadorAnterior;

const screen = document.querySelector(".screen");

function clickBotao(value) {
    if (isNaN(value)) {
        handleSimbolo(value);
    } else {
        handleNumero(value);
    }
    screen.innerText = buffer;  
}

function handleSimbolo(simbolo) {
    switch (simbolo) {
        case "C":
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (operadorAnterior === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            operadorAnterior = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '−': 
        case '×':  
        case '÷':  
        case '+':
            handleMath(simbolo);
            break;
    }   
}

function handleMath(simbolo) {
    if (buffer === '0') {
        return;
    }

    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    operadorAnterior = simbolo;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if (operadorAnterior === '+') {
        runningTotal += intBuffer;
    } else if (operadorAnterior === '−') {
        runningTotal -= intBuffer;
    } else if (operadorAnterior === '×') {
        runningTotal *= intBuffer;
    } else if (operadorAnterior === '÷') {
        runningTotal /= intBuffer;
    }
}

function handleNumero(numString) {
    if (buffer === "0") {
        buffer = numString;
    } else {
        buffer += numString;
    }
}

function init() {
    document.querySelector(".calc-botoes")
        .addEventListener("click", function(event) {
            clickBotao(event.target.innerText);
        });
}

init();
