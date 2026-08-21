console.log("Math Out is running!")

//html elements:
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const submitButton = document.getElementById("submit-btn");
const scoreElement = document.getElementById("score");
const feedbackElement = document.getElementById("feedback");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const resultsScreen = document.getElementById("results-screen");
const startButton = document.getElementById("start-btn");
const timerElement = document.getElementById("timer"); 
const finalScoreElement = document.getElementById("final-score");
const accuracyElement = document.getElementById("accuracy");
const playAgainButton = document.getElementById("play-again-btn");
const backHomeButton = document.getElementById("back-home-btn");
const difficultyButtons = document.querySelectorAll(".difficulty-btn");

let correctAnswer;
let score = 0;
let timer;
let gameOver;
let difficulty = "easy";


//Show Game Screen
startButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", startGame);

function startGame() {
    score = 0; 
    timeRemaining = 60;
    gameOver = false;

    scoreElement.textContent = score;
    timerElement.textContent = timeRemaining;

    generateQuestion();
    showGameScreen();

    timer = setInterval(function(){
        timeRemaining--;
        timerElement.textContent = timeRemaining;

        if (timeRemaining <= 0){
            clearInterval(timer);
            gameOver = true;
            feedbackElement.textContent= "Time's up!";
            console.log("Time is up");
            endGame();
        }

    }, 1000); //1000 millisceconds == 1 second
    if (gameOver == true) {
        console.log("Game is over")
        endGame();
        return;
    }
}

//Difficulty buttons
difficultyButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        difficulty = button.dataset.difficulty;

        difficultyButtons.forEach(function(btn){
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

    });

});

function showGameScreen(){
    startScreen.classList.add("hidden");
    resultsScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");
}

//Generate the Addition Question
let questionCount = 0;
function generateQuestion(){
    let maxNumber;

    switch(difficulty){
        case "easy":
            maxNumber = 10;
            break
        case "medium":
            maxNumber = 50;
            break
        case "hard":
            maxNumber = 100;
            break
    }

    const number1 = Math.floor(Math.random() * maxNumber) + 1;
    const number2 = Math.floor(Math.random() * maxNumber) + 1;

    correctAnswer = number1 + number2; 
    questionElement.textContent = `${number1} + ${number2}`;

    questionCount++;
}
generateQuestion(); 

//Check the answer
let correct = 0;
submitButton.addEventListener("click", checkAnswer);

answerElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkAnswer();
    }
});
function checkAnswer() {
    const userAnswer = Number(answerElement.value);
    

    if (userAnswer === correctAnswer) {
        score++; 
        correct++;

        scoreElement.textContent = score;

        feedbackElement.textContent = "Correct!";

        //reset
        answerElement.value = "";
    }else {
        feedbackElement.textContent = "No... :("; 
        answerElement.value = "";
    }
    generateQuestion();
    
    // feedbackElement.textContent = "";

    
}



//Game over!
function endGame() {
    // gameOver = true;

    clearInterval(timer);

    gameScreen.classList.add("hidden");
    startScreen.classList.add("hidden");

    resultsScreen.classList.remove("hidden");
    finalScoreElement.textContent = score;
    
    let accuracy = (correct / questionCount) * 100;
    accuracyElement.textContent = `${accuracy.toFixed(1)} %`;
}

backHomeButton.addEventListener("click", homeScreen);
function homeScreen() {
    gameScreen.classList.add("hidden");
    resultsScreen.classList.add("hidden");

    startScreen.classList.remove("hidden");
}