// Quiz questions
var questions = [
    // Question 1
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["<script>", "<js>", "<javascript>", "<scripting>"],
        answer: "<script>"
    },
    // Question 2
    {
        question: "Where is the correct place to insert a JavaScript?",
        choices: ["The <body> section", "The <head> section", "Both the <head> section and the <body> section", "None of the above"],
        answer: "Both the <head> section and the <body> section"
    },
    // Question 3
    {
        question: "Which of the following is a JavaScript data type?",
        choices: ["String", "Boolean", "Array", "All of the above"],
        answer: "All of the above"
    },
    // Question 4
    {
        question: "What is the correct syntax for a 'for' loop in JavaScript?",
        choices: ["for (i = 0; i <= 5)", "for i = 1 to 5", "for (i <= 5; i++)", "for (i = 0; i < 5; i++)"],
        answer: "for (i = 0; i < 5; i++)"
    },
    // Question 5
    {
        question: "Which method is used to remove the last element from an array in JavaScript?",
        choices: ["pop()", "push()", "shift()", "unshift()"],
        answer: "pop()"
    },
    // Question 6
    {
        question: "What does the 'typeof' operator in JavaScript return?",
        choices: ["String", "Number", "Boolean", "Undefined"],
        answer: "Undefined"
    },
    // Question 7
    {
        question: "What is the correct way to write a comment in JavaScript?",
        choices: ["// This is a comment", "<!-- This is a comment -->", "/* This is a comment */", "Comment: This is a comment"],
        answer: "// This is a comment"
    },
    // Question 8
    {
        question: "Which method is used to add new elements to the end of an array in JavaScript?",
        choices: ["pop()", "push()", "shift()", "unshift()"],
        answer: "push()"
    },
    // Question 9
    {
        question: "What is the output of the following code?\n\nconsole.log(2 + '2');",
        choices: ["22", "4", "NaN", "TypeError"],
        answer: "22"
    },
    // Question 10
    {
        question: "Which built-in method removes the last element from an array and returns that element?",
        choices: ["last()", "get()", "pop()", "remove()"],
        answer: "pop()"
    }
];

// Global Variables
var currentQuestionIndex = 0; // Index of the current question
var time = 60; // Initial time for the quiz
var timerInterval; // Reference to the timer interval
var score = 0; // Player's score

// DOM Elements
var startButton = document.getElementById("start-button"); // Start button element
var questionElement = document.getElementById("question"); // Question element
var choicesElement = document.getElementById("choices"); // Choices container element
var feedbackElement = document.getElementById("feedback"); // Feedback element
var nextButton = document.getElementById("next-button"); // Next button element
var gameOverScreen = document.getElementById("game-over-screen"); // Game over screen element
var finalScoreElement = document.getElementById("final-score"); // Final score element
var initialsInput = document.getElementById("initials"); // Initials input element
var scoreForm = document.getElementById("score-form"); // Score submission form element
var restartButton = document.getElementById("restart-button"); // Restart button element

// Event listeners
startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", showNextQuestion);
scoreForm.addEventListener("submit", saveHighScore);
restartButton.addEventListener("click", restartQuiz);

// Function to start the quiz
function startQuiz() {
    startTimer(); // Start the timer
    hideElement("start-screen"); // Hide the start screen
    showElement("quiz-screen"); // Show the quiz screen
    renderQuestion(); // Render the first question
    console.log("Quiz started");
}

// Function to start the timer
function startTimer() {
    timerInterval = setInterval(function () {
        time--; // Decrease the time by 1 second
        if (time <= 0) {
            clearInterval(timerInterval); // Stop the timer
            endQuiz(); // End the quiz
        }
    }, 1000);
    console.log("Timer started");
}

// Function to render the current question
function renderQuestion() {
    var currentQuestion = questions[currentQuestionIndex]; // Get the current question object
    questionElement.textContent = currentQuestion.question; // Set the question text
    choicesElement.innerHTML = ""; // Clear the choices container
    currentQuestion.choices.forEach(function (choice, index) {
        var choiceButton = document.createElement("button"); // Create a button for each choice
        choiceButton.textContent = choice; // Set the choice text
        choiceButton.setAttribute("class", "choice"); // Set the button class
        choiceButton.setAttribute("value", choice); // Set the button value
        choiceButton.addEventListener("click", checkAnswer); // Add event listener for the choice button
        choicesElement.appendChild(choiceButton); // Append the choice button to the choices container
    });
    console.log("Question rendered:", currentQuestionIndex);
}

// Function to check the selected answer
function checkAnswer(event) {
    var selectedChoice = event.target.value; // Get the selected choice
    var currentQuestion = questions[currentQuestionIndex]; // Get the current question object
    if (selectedChoice === currentQuestion.answer) {
        feedbackElement.textContent = "Correct!"; // Display correct feedback
        score++; // Increase the score
    } else {
        feedbackElement.textContent = "Wrong!"; // Display wrong feedback
        time -= 10; // Decrease the time by 10 seconds
        if (time < 0) {
            time = 0; // Ensure time doesn't go below 0
        }
    }
    disableChoices(); // Disable choice buttons
    showElement("feedback-screen"); // Show the feedback screen
    console.log("Answer checked");
}

// Function to disable choice buttons
function disableChoices() {
    var choiceButtons = document.getElementsByClassName("choice"); // Get all choice buttons
    for (var i = 0; i < choiceButtons.length; i++) {
        choiceButtons[i].disabled = true; // Disable each choice button
    }
    console.log("Choices disabled");
}

// Function to show the next question
function showNextQuestion() {
    currentQuestionIndex++; // Increment the current question index
    if (currentQuestionIndex < questions.length) {
        hideElement("feedback-screen"); // Hide the feedback screen
        renderQuestion(); // Render the next question
    } else {
        endQuiz(); // End the quiz if there are no more questions
    }
    console.log("Next question shown");
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timerInterval); // Stop the timer
    hideElement("quiz-screen"); // Hide the quiz screen
    showElement("game-over-screen"); // Show the game over screen
    finalScoreElement.textContent = score; // Display the final score
    console.log("Quiz ended");
}

// Function to save the high score
function saveHighScore(event) {
    event.preventDefault();
    var initials = initialsInput.value.trim().toUpperCase(); // Get the initials and remove leading/trailing spaces
    if (initials !== "") {
        var highScores = JSON.parse(localStorage.getItem("highScores")) || []; // Get existing high scores from local storage or create an empty array
        var newScore = { initials: initials, score: score }; // Create a new score object
        highScores.push(newScore); // Add the new score to the high scores array
        localStorage.setItem("highScores", JSON.stringify(highScores)); // Store the updated high scores array in local storage
        initialsInput.value = ""; // Clear the initials input
        showHighScores(); // Show the high scores screen
        console.log("High score saved:", initials, score);
    }
}

// Function to show high scores
function showHighScores() {
    var highScores = JSON.parse(localStorage.getItem("highScores")) || []; // Get high scores from local storage or an empty array
    var highScoresList = document.getElementById("high-scores"); // High scores list element
    highScoresList.innerHTML = ""; // Clear the high scores list
    highScores.forEach(function (score) {
        var scoreItem = document.createElement("li"); // Create an item for each high score
        scoreItem.textContent = score.initials + " - " + score.score; // Set the text of the high score item
        highScoresList.appendChild(scoreItem); // Append the high score item to the high scores list
    });
    hideElement("game-over-screen"); // Hide the game over screen
    showElement("high-scores-screen"); // Show the high scores screen
    console.log("High scores displayed");
}

// Function to restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0; // Reset the current question index
    time = 60; // Reset the time
    score = 0; // Reset the score
    hideElement("game-over-screen"); // Hide the game over screen
    showElement("start-screen"); // Show the start screen
    console.log("Quiz restarted");
}

// Function to hide an element
function hideElement(elementId) {
    var element = document.getElementById(elementId);
    if (element) {
        element.classList.add("hide"); // Add the "hide" class to hide the element
    }
}

// Function to show an element
function showElement(elementId) {
    var element = document.getElementById(elementId);
    if (element) {
        element.classList.remove("hide"); // Remove the "hide" class to show the element
    }
}
