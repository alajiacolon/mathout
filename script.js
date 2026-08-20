console.log("Math Out is running!")

//html elements:
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const submitButton = document.getElementById("submit-btn");
const scoreElement = document.getElementById("score");
const feedbackElement = document.getElementById("feedback");

let correctAnswer;
let score = 0;

//Generate the Addition Question

function generateQuestion(){
    const number1 = Math.floor(Math.random() * 10) + 1;
    const number2 = Math.floor(Math.random() * 10) + 1;

    correctAnswer = number1 + number2; 
    questionElement.textContent = `${number1} + ${number2}`;
}
generateQuestion(); 

//Check the answer
submitButton.addEventListener("click", checkAnswer);
function checkAnswer() {
    const userAnswer = Number(answerElement.value);

    if (userAnswer === correctAnswer) {
        score++; 
        scoreElement.textContent = score;

        feedbackElement.textContent = "Correct!";

        //reset
        answerElement.value = "";
        generateQuestion();
    }else {
        feedbackElement.textContent = "No... :("; 
    }

    if (gameOver) {
        return;
    }
}

//Timer
const timerElement = document.getElementById("timer"); 
let timeRemaining = 60; 
let gameOver = false; 

const timer = setInterval(function(){
    timeRemaining--;
    timerElement.textContent = timeRemaining;

    if (timeRemaining <= 0){
        clearInterval(timer);
        gameOver = true;
        feedbackElement.textContent= "Time's up!";
    }

}, 1000); //1000 millisceconds == 1 second

//Game over!

