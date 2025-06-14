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



let currentQuestion = 0;
let score = 0;

// DOM
const questionEl = document.getElementById("question");  
const optionsEl = document.getElementById("options"); 
const nextBtn = document.getElementById("next-btn"); 
const scoreEl = document.getElementById("score"); 

// Function to load a question
function loadQuestion() {
    let q = quizData[currentQuestion]; 
    questionEl.textContent = q.question;
    optionsEl.innerHTML = ""; 

    // Loop to create answer buttons 
    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option; 
        btn.onclick = () => checkAnswer(option); 
        optionsEl.appendChild(btn); 
    });
}

// Function to check the user's answer
function checkAnswer(selected) {
    if (selected === quizData[currentQuestion].answer) { 
        score++;
    }
    currentQuestion++; // Move to next question

    // if quiz ended
    if (currentQuestion < quizData.length) {
        loadQuestion(); // Load the next question
    } else {
        // final results
        questionEl.textContent = "Quiz Completed!";
        optionsEl.innerHTML = "";
        nextBtn.style.display = "none";
        scoreEl.textContent = `Final Score: ${score} / ${quizData.length}`;
    }
}

// Load first question on page load
nextBtn.onclick = () => loadQuestion();
loadQuestion();
