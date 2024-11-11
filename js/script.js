const timer30 = document.getElementById("timer");
const messageNum = document.getElementById("message");
const numbersRand = document.getElementById("numbers");
const inputsHidden = document.getElementById("inputs");
const resultNum = document.getElementById("result");
const submitButton = document.getElementById("submit");

const numbCount = 5;
let numbers = [];
let timeLeft = 30;
let timer;

function generateNumbers() {
    numbers = [];
    for (let i = 0; i < numbCount; i++) {
        numbers.push(Math.floor(Math.random() * 99) + 1);
    }
    numbersRand.innerText = numbers.join(" ");
}

function startTimer() {
    timer = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timer);
            messageNum.innerText = "Tempo scaduto! Ora inserisci i numeri che ricordi:";
            inputsHidden.classList.remove("d-none");
            numbersRand.classList.add("d-none");
            timer30.innerText = "0";
        } else {
            timer30.innerText = timeLeft;
            timeLeft--;
        }
    }, 1000);
}

function checkAnswers() {
    const inputs = document.querySelectorAll("#inputs input");
    let userNumbers = [];
    let correctAnswers = 0;

    
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove('is-invalid');
    }

    for (let i = 0; i < inputs.length; i++) {
        let userInput = parseInt(inputs[i].value);

    
        if (isNaN(userInput) || userInput < 1 || userInput > 99) {
            inputs[i].classList.add('is-invalid');
        } else {
            userNumbers.push(userInput);
        }
    }

    if (userNumbers.length !== numbCount) {
        resultNum.innerText = "Per favore, inserisci esattamente 5 numeri.";
        return;
    }

    for (let number of numbers) {
        if (userNumbers.includes(number)) {
            correctAnswers++;
        }
    }

    resultNum.innerText = `Hai ricordato correttamente ${correctAnswers} numeri su ${numbCount}`;
}


function startGame() {
    timeLeft = 30;
    generateNumbers();
    numbersRand.classList.remove("d-none");
    inputsHidden.classList.add("d-none");
    resultNum.innerText = "";
    startTimer();
}

submitButton.addEventListener("click", function () {
    checkAnswers();
});

startGame();
