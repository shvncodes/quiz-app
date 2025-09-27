import { questions } from "./questions.js";
const startPageNode = document.querySelector("#startPage");
const userNameNode = document.querySelector("#nameInput");
const quizStartBtnNode = document.querySelector("#quizStartBtn");
const quizPageNode = document.querySelector("#quizPage");
const questionNameNode = document.querySelector("#question");
const optionsNode = document.querySelector("#options");
const skipBtnNode = document.querySelector("#skipBtn");
const nextQuesBtnNode = document.querySelector("#nextQuesBtn");
const quizEndBtnNode = document.querySelector("#quizEndBtn");
const scorePageNode = document.querySelector("#scorePage");
const userScoreNode = document.querySelector("#totalScore");
const resultMsgNode = document.querySelector("#resultMsg");

let currentScore = 0;
let currentQuestionIndx = 0;

function showResult() {
    quizPageNode.style.display = 'none';
    scorePageNode.style.display = 'flex';

    const totalScore = 4*(questions.length);
    userScoreNode.textContent = `Your total score is: ${currentScore} out of ${totalScore}`;
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

function startQuiz() {
    if(!userNameNode.value.trim()) {
        alert('Please enter your name to start the quiz.');
        return;
    }
    startPageNode.style.display = 'none';
    quizPageNode.style.display = 'flex';

    timer();
    insertQuestionInDOM(questions[currentQuestionIndx]);
}

quizStartBtnNode.addEventListener("click", startQuiz);

userNameNode.addEventListener("keydown", (e)=> {
    if(e.key === "Enter") startQuiz();
})

function insertQuestionInDOM(question) {
    questionNameNode.textContent = `Q.${currentQuestionIndx+1}: `+question.name;
    let optionsHTML = "";
    question.options.forEach((option, i) => {
       optionsHTML += `<div id="option${i}">
            <input id="opt${i}" name="option" type="radio" value='${option}'>
            <label for="opt${i}">${option}</label>
        </div>\n`
    })  
    optionsNode.innerHTML = optionsHTML;
}

skipBtnNode.addEventListener("click", function() {
    if(currentQuestionIndx === questions.length - 1) {
        showResult();
        return;
    }
    currentQuestionIndx++;
    insertQuestionInDOM(questions[currentQuestionIndx]);
})

nextQuesBtnNode.addEventListener("click", function() {
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

quizEndBtnNode.addEventListener("click", showResult);