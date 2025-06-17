const quizData = [
  { question: "What is 5 + 3?", options: ["5", "8", "10", "15"], answer: "8" },
  { question: "Which is the commercial capital of India?", options: ["Mumbai", "Delhi", "Chennai", "Kolkata"], answer: "Mumbai" },
  { question: "Solve: (20 / 4) + 5", options: ["2", "5", "10", "8"], answer: "10" },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Venus", "Jupiter"], answer: "Mars" },
  { question: "What is the boiling point of water?", options: ["50°C", "75°C", "100°C", "150°C"], answer: "100°C" },
  { question: "Who wrote the Indian National Anthem?", options: ["Tagore", "Gandhi", "Krishna", "Saurabh"], answer: "Tagore" },
  { question: "Which number is a prime?", options: ["4", "6", "9", "7"], answer: "7" },
  { question: "What color is a ripe banana?", options: ["Red", "Green", "Yellow", "Blue"], answer: "Yellow" },
  { question: "How many continents are there?", options: ["5", "6", "7", "8"], answer: "7" },
  { question: "Which gas do humans need to breathe?", options: ["Carbon", "Oxygen", "Hydrogen", "Nitrogen"], answer: "Oxygen" },
  { question: "Who is the Prime Minister of India (as of 2024)?", options: ["ME", "Modi", "Krishna", "Shivam"], answer: "Modi" },
  { question: "What is the capital of France?", options: ["Paris", "Berlin", "London", "Madrid"], answer: "Paris" },
  { question: "What is the square root of 64?", options: ["6", "7", "8", "9"], answer: "8" },
  { question: "Which shape has 4 equal sides?", options: ["Rectangle", "Circle", "Square", "Triangle"], answer: "Square" },
  { question: "What is H2O commonly known as?", options: ["Salt", "Water", "Hydrogen", "Oxygen"], answer: "Water" },
  { question: "Which direction does the sun rise?", options: ["West", "North", "East", "South"], answer: "East" },
  { question: "How many hours are there in 2 days?", options: ["24", "36", "48", "60"], answer: "48" },
  { question: "Which is the smallest prime number?", options: ["0", "1", "2", "3"], answer: "2" },
  { question: "Which animal is known as the king of the jungle?", options: ["Elephant", "Tiger", "Lion", "Bear"], answer: "Lion" },
  { question: "Which month comes after September?", options: ["October", "August", "November", "July"], answer: "October" }
];


let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("time");
const progressEl = document.getElementById("progress");
const leaderboardEl = document.getElementById("leaderboard");
const leaderboardContainer = document.getElementById("leaderboard-container");

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  updateTimer();
  timer = setInterval(countdown, 1000);
  nextBtn.disabled = true;

  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectAnswer(btn, option);
    optionsEl.appendChild(btn);
  });

  updateProgressBar();
}

function countdown() {
  timeLeft--;
  updateTimer();
  if (timeLeft === 0) {
    clearInterval(timer);
    autoSelect();
  }
}

function updateTimer() {
  timerEl.textContent = timeLeft;
}

function selectAnswer(button, selected) {
  clearInterval(timer);
  const correct = quizData[currentQuestion].answer;
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.classList.add("correct");
    } else if (btn.textContent === selected) {
      btn.classList.add("incorrect");
    }
  });

  if (selected === correct) score++;
  nextBtn.disabled = false;
}

function autoSelect() {
  const correct = quizData[currentQuestion].answer;
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.classList.add("correct");
    }
  });
  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
};

function updateProgressBar() {
  const percent = ((currentQuestion) / quizData.length) * 100;
  progressEl.style.width = `${percent}%`;
}

function showResults() {
  clearInterval(timer);
  questionEl.textContent = "Quiz Completed!";
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
  scoreEl.textContent = `Your Score: ${score} / ${quizData.length}`;
  showLeaderboard(score);
}

function showLeaderboard(finalScore) {
  leaderboardContainer.style.display = "block";
  let scores = JSON.parse(localStorage.getItem("quizScores")) || [];
  scores.push({ name: "You", score: finalScore });
  scores = scores.sort((a, b) => b.score - a.score).slice(0, 5);
  localStorage.setItem("quizScores", JSON.stringify(scores));

  leaderboardEl.innerHTML = "";
  scores.forEach((entry, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${entry.name} - ${entry.score}`;
    leaderboardEl.appendChild(li);
  });
}

// Start the quiz
loadQuestion();
