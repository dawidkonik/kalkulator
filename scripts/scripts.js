// Pobieranie wszystkich rzeczy
var currentNumber = document.querySelector('.currentNumber');

var previousNumber = document.querySelector('.previousNumber p');

var mathSign = document.querySelector('.mathSign');

var numbersButtons = document.querySelectorAll('.number');

var operatorsButtons = document.querySelectorAll('.operator');

var equalsButton = document.querySelector('.equals');

var clearButton = document.querySelector('.clear');

var calculatorHistory = document.querySelector('.history');

var historyBtn = document.querySelector('.history-btn');


// Zmienna przechowujaca wynik
let result = '';


// Funkcje przyciskow
function displayNumbers() {
    // Jesli klikniemy w kropke a ona juz jest to nic nie rob
    if (this.textContent === '.' && currentNumber.innerHTML.includes('.')) return;

    // Jesli jako pierwsze klikniemy przecinek to pojawi sie 0 przed przecinkiem
    if(this.textContent === '.' && currentNumber.innerHTML === '') return currentNumber.innerHTML = '0.';

    currentNumber.innerHTML += this.textContent;
}

// Zajmuje sie operatorami
function operate() {
    if(currentNumber.innerHTML === '' && this.textContent === '-') {
        currentNumber.innerHTML = '-';
        return;
    } 
    
    else if (currentNumber.innerHTML === '') {
        return;
    }  

    if (mathSign.innerHTML !== '') {
        showResult();
    }

    previousNumber.innerHTML = currentNumber.innerHTML;
    mathSign.innerHTML = this.textContent;
    currentNumber.innerHTML = '';
}




function showResult() {
    if(previousNumber.innerHTML === '' || currentNumber.innerHTML === '') return;
    let a = Number(currentNumber.innerHTML);
    let b = Number(previousNumber.innerHTML);
    let operator = mathSign.innerHTML;

// Instrukcja warunkowa zeby liczylo
    switch(operator) {
        case '+':
        result = a + b;
        break;

        case '-':
        result = a - b;
        break;

        case ':':
        result = a/b;
        break;

        case 'x':
         result = b / a;
         break;

         case '2^':
          result = b ** a;
         break;
    }


    addToHistory();
    historyBtn.classList.add('active')
    currentNumber.innerHTML = result;
    previousNumber.innerHTML = '';
    mathSign.innerHTML = '';
}


function addToHistory () {
    const newHistoryItem = document.createElement('li');
    newHistoryItem.innerHTML = `${currentNumber.innerHTML} ${mathSign.innerHTML} ${previousNumber.innerHTML} = ${result}`
    newHistoryItem.classList.add('history-item');
    calculatorHistory.appendChild(newHistoryItem);
}


function clearScreen () {
    result = '';
    currentNumber.innerHTML = '';
    previousNumber.innerHTML = '';
    mathSign.innerHTML = '';
}


function clearHistory () {
    calculatorHistory.textContent = '';
    if(calculatorHistory.textContent === '') {
        historyBtn.classList.remove('active');
    }
}





















// Nasluchiwanie przyciskow na kazda funkcje
operatorsButtons.forEach((button) => button.addEventListener('click', operate));

equalsButton.addEventListener('click', showResult);

clearButton.addEventListener('click', clearScreen);

numbersButtons.forEach((button) => {
    button.addEventListener('click', displayNumbers)
});

historyBtn.addEventListener('click', clearHistory);