// List of quiz questions and answers
const quizData = [
  { question: "What is 5 + 3?", options: ["5", "8", "10", "15"], answer: "8" },
  { question: "Which is commercial capital of india?", options: ["Mumbai", "Delhi", "Chennai", "Kolkata"], answer: "Mumbai" },
  { question: "Solve: (20 / 4)+5", options: ["2", "5", "10", "8"], answer: "10" },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Venus", "Jupiter"], answer: "Mars" },
  { question: "What is the boiling point of water?", options: ["50°C", "75°C", "100°C", "150°C"], answer: "100°C" },
  { question: "Who wrote the Indian National Anthem?", options: ["Tagore", "Gandhi", "krishna", "Saurabh"], answer: "Tagore" },
  { question: "Which number is a prime?", options: ["4", "6", "9", "7"], answer: "7" },
  { question: "Which color is showing on screen?", options: ["Hara", "Baigani", "Kala", "Nila"], answer: "Baigani" },
  { question: "How many continents are there?", options: ["5", "6", "7", "8"], answer: "7" },
  { question: "Which gas do humans need to breathe?", options: ["Carbon", "Oxygen", "Hydrogen", "Air"], answer: "Oxygen" },
  { question: "Who is the Prime Minister of India?", options: ["ME", "Modi", "Krishna", "Shivam"], answer: "Modi" }
];


// Variables to track the current question and score
let currentQuestion = 0;
let score = 0;

// Getting HTML elements
const questionEl = document.getElementById("question"); // Displays the question
const optionsEl = document.getElementById("options"); // Holds answer choices
const nextBtn = document.getElementById("next-btn"); // Button to move to next question
const scoreEl = document.getElementById("score"); // Displays final score

// Function to load a question
function loadQuestion() {
    let q = quizData[currentQuestion]; // Fetch the current question
    questionEl.textContent = q.question; // Display the question
    optionsEl.innerHTML = ""; // Clear previous options

    // Loop to create answer buttons dynamically
    q.options.forEach(option => {
        const btn = document.createElement("button"); // Create a button
        btn.textContent = option; // Set button text
        btn.onclick = () => checkAnswer(option); // Add click event
        optionsEl.appendChild(btn); // Append button to the options container
    });
}

// Function to check the user's answer
function checkAnswer(selected) {
    if (selected === quizData[currentQuestion].answer) { // Compare selection with correct answer
        score++; // Increment score if correct
    }
    currentQuestion++; // Move to next question

    // Check if the quiz is over
    if (currentQuestion < quizData.length) {
        loadQuestion(); // Load the next question
    } else {
        // Show final results
        questionEl.textContent = "Quiz Completed!";
        optionsEl.innerHTML = ""; // Remove options
        nextBtn.style.display = "none"; // Hide next button
        scoreEl.textContent = `Final Score: ${score} / ${quizData.length}`; // Show final score
    }
}
