var Numbers = document.querySelectorAll('.number'),
    Operations = document.querySelectorAll('.operation'),
    DecimalBtn = document.getElementById('decimal'),
    ClearBtns = document.querySelectorAll('.clear_btn'),
    Display = document.getElementById('display'),
    MemoryCurrentNumber = 0,
    MemoryNewNumber = false,
    MemoryPendingOperation = '';



for (var i = 0; i < Numbers.length; i++) {
    var number = Numbers[i];
    number.addEventListener('click', function(e) {
        numberPress(e.target.textContent);
    });
}

for (var i = 0; i < Operations.length; i++) {
    var operationBtn = Operations[i];
    operationBtn.addEventListener('click', function(e) {
        operation(e.target.textContent);
    });
}

for (var i = 0; i < ClearBtns.length; i++) {
    var clearBtn = ClearBtns[i];
    clearBtn.addEventListener('click', function(e) {
        clear(e.srcElement.id);
    });
}

DecimalBtn.addEventListener('click', decimal);



function numberPress(number) {
    if (MemoryNewNumber) {
        display.value = number;
        MemoryNewNumber = false;
    } else {
        if (display.value === '0') {
            display.value = number;
        } else {
            display.value += number;
        }
    }
}

function operation(op) {
    var localOperationMemory = display.value;
    if (MemoryNewNumber && MemoryPendingOperation !== '=') {
        display.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
        if (MemoryPendingOperation === '+') {
            MemoryCurrentNumber += parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '-') {
            MemoryCurrentNumber -= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '*') {
            MemoryCurrentNumber *= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '/') {
            MemoryCurrentNumber /= parseFloat(localOperationMemory);
        } else {
            MemoryCurrentNumber = parseFloat(localOperationMemory);
        }
        display.value = MemoryCurrentNumber;
        MemoryPendingOperation = op;
    }
}


function clear(id) {
    if (id == 'ce') {
        display.value = '0';
        MemoryNewNumber = true;
    } else if (id == 'c') {
        display.value = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
    }
}

function decimal() {
    var localDecimalMemory = display.value;

    if (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        }
    }
    display.value = localDecimalMemory;
}
