import { questions } from "./questions.js";
const startPage = document.querySelector("#startPage");
const userName = document.querySelector("#nameInput");
const quizStartBtn = document.querySelector("#quizStartBtn");
const quizPage = document.querySelector("#quizPage");
const ques = document.querySelector("#question");
const optionsNode = document.querySelector("#options");
const skipBtn = document.querySelector("#skipBtn");
const nextQuesBtn = document.querySelector("#nextQuesBtn");
const quizEndBtn = document.querySelector("#quizEndBtn");
const scorePage = document.querySelector("#scorePage");
const result = document.querySelector("#totalScore");
const resultMsgNode = document.querySelector("#resultMsg");

let currentScore = 0;
let currentQuestionIndx = 0;

function showResult() {
    quizPage.style.display = 'none';
    scorePage.style.display = 'flex';

    const totalScore = 4*(questions.length);
    result.textContent = `Your total score is: ${currentScore} out of ${totalScore}`;
    if(currentScore >= 20) {
       resultMsgNode.textContent = "Congratulations you passed this Quiz!!";
       resultMsgNode.style.color = 'green';
    } else {
        resultMsgNode.textContent = "You failed this Quiz, Better luck next time!!";
        resultMsgNode.style.color = 'red';   
    }
}

function timer() {
    const timerNode = document.getElementById("timer");
    const initialTime = 2 * 60;
    let totalSeconds = initialTime;
    let intervalId = null;

    function updatedisplay() {
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
        const seconds = String(totalSeconds % 60).padStart(2, "0");
        timerNode.textContent = `Timer: ${minutes}:${seconds}`;
    }

    function startTimer() {
        if (intervalId) return;
        updatedisplay();

        intervalId = setInterval(() => {
            totalSeconds--;
            updatedisplay();

            if (totalSeconds <= 0) {
                clearInterval(intervalId);
                intervalId = null;
                showResult();
            }
        }, 1000);
    }

    startTimer();
};

quizStartBtn.addEventListener("click", () => {
    if (!userName.value.trim()) {
        alert('Please enter your name to start the quiz.');
        return;
    }
    startPage.style.display = 'none';
    quizPage.style.display = 'flex';

    timer();
    insertQuestionInDOM(questions[currentQuestionIndx]);
})

function insertQuestionInDOM(question) {
    ques.textContent = `Q.${currentQuestionIndx+1}: `+question.name;
    let optionsHTML = "";
    question.options.forEach((option, i) => {
       optionsHTML += `<div id="option${i}">
            <input id="opt${i}" name="option" type="radio" value='${option}'>
            <label for="opt${i}">${option}</label>
        </div>\n`
    })  
    optionsNode.innerHTML = optionsHTML;
}

skipBtn.addEventListener("click", function() {
    if(currentQuestionIndx === questions.length - 1) {
        showResult();
        return;
    }
    currentQuestionIndx++;
    insertQuestionInDOM(questions[currentQuestionIndx]);
})

nextQuesBtn.addEventListener("click", function() {
    if(currentQuestionIndx === questions.length - 1) {
        showResult();
        return;
    }
    const selectedInput = document.querySelector('input[name = "option"]:checked');
    if(!selectedInput) {
        alert("Select an option");
        return;
    } 
    if(selectedInput.value === questions[currentQuestionIndx].rightOption) currentScore += 4;
    else currentScore -= 1;

    currentQuestionIndx++;
    insertQuestionInDOM(questions[currentQuestionIndx]);
})


quizEndBtn.addEventListener("click", showResult);