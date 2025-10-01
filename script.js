import { questions } from "./questions.js";
const startPageNode = document.querySelector("#startPage");
const userNameNode = document.querySelector("#nameInput");
const quizStartBtnNode = document.querySelector("#quizStartBtn");
const quizPageNode = document.querySelector("#quizPage");
const questionNameNode = document.querySelector("#question");
const optionsNode = document.querySelector("#options");
const backBtnNode = document.querySelector("#backBtn");
const skipBtnNode = document.querySelector("#skipBtn");
const nextQuesBtnNode = document.querySelector("#nextQuesBtn");
const quizEndBtnNode = document.querySelector("#quizEndBtn");
const scorePageNode = document.querySelector("#scorePage");
const userScoreNode = document.querySelector("#totalScore");
const resultMsgNode = document.querySelector("#resultMsg");
const LOCAL_STORAGE_KEY = "leaderboardData";

let currentQuestionIndx = 0;

const userSelections = [];
const leaderboardData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? [];

function showResult() {
    quizPageNode.style.display = 'none';
    scorePageNode.style.display = 'flex';

    let score = 0;
    for(let i = 0; i < questions.length; i++) {
        if(userSelections[i] === questions[i].rightOption) score += 4;
        else if(userSelections[i] != null) score -= 1;
    }

    const totalScore = 4*(questions.length);
    userScoreNode.textContent = `Your total score is: ${score} out of ${totalScore}`;
    if(score >= 20) {
       resultMsgNode.textContent = "Congratulations you passed this Quiz!!";
       resultMsgNode.style.color = 'green';
    } else {
        resultMsgNode.textContent = "You failed this Quiz, Better luck next time!!";
        resultMsgNode.style.color = 'red';   
    }

    const data = {
        id: Date.now() + Math.random().toString(16).slice(2),
        name: userNameNode.value,
        score: score,
        date: new Date().toDateString(),
    }
    leaderboardData.push(data);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(leaderboardData));
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
    questionNameNode.textContent = `Q.${currentQuestionIndx+1}: `+ question.name;
    let optionsHTML = "";
    question.options.forEach((option, i) => {
        const isSelected = userSelections[currentQuestionIndx] === option;
        optionsHTML += `<div id="option${i}">
                <input id="opt${i}" name="option" type="radio" value='${option}' ${isSelected ? 'checked' : ''}>
                <label for="opt${i}">${option}</label>
            </div>\n`
    })
    optionsNode.innerHTML = optionsHTML;
}

backBtnNode.addEventListener("click", function() {
    if(currentQuestionIndx === 0) return;

    currentQuestionIndx--;
    insertQuestionInDOM(questions[currentQuestionIndx]);
})

skipBtnNode.addEventListener("click", function() {
    if(currentQuestionIndx === questions.length - 1) {
        showResult();
        return;
    }

    userSelections[currentQuestionIndx] = null;

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

    userSelections[currentQuestionIndx] = selectedInput.value;

    currentQuestionIndx++;
    insertQuestionInDOM(questions[currentQuestionIndx]);
})

quizEndBtnNode.addEventListener("click", showResult);