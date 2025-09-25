/* -> Create 3 page : start, quiz, score
1. startPage:- basic layout when user click on Start Quiz button start and last page hide and show mid page.
2. quizPage:- basic layout
            - timer start (02:00)
            - Upadte Score
            - End Quiz button -> startPage & midPage hide and show last page with score
            - Skip button: doesn't count it score and move to next question
            - Next button: add it score on currentScore and move to next question
            - if(it last question(10)) then after click on Submit button: add it score and show last page
3. scorePage:- basic layout
            - show total score
            - if(score >= 20) then show pass message else show fail message 
*/
import { questions } from "./questions.js"; 
const startPage = document.querySelector("#startPage");
const userName = document.querySelector("#nameInput");
const quizStartBtn = document.querySelector("#quizStartBtn");
const quizPage = document.querySelector("#quizPage");
const scorePage = document.querySelector("#scorePage");

quizStartBtn.addEventListener("click", () => {
    if(!userName.value.trim()) {
        alert('Please enter your name to start the quiz.');
        return;
    }
    startPage.style.display = 'none';
    quizPage.style.display = 'flex';
})