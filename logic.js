const quizData = [
  { question: "What does HTML stand for?", options: ["Hyper Trainer Marking Language", "HyperText Markup Language", "HyperText Marketing Language", "HyperText Markdown Language"], answer: "HyperText Markup Language" },
  { question: "Which tag is used for inserting an image in HTML?", options: ["<img>", "<image>", "<pic>", "<src>"], answer: "<img>" },
  { question: "Which HTML tag is used for creating a hyperlink?", options: ["<a>", "<href>", "<link>", "<url>"], answer: "<a>" },
  { question: "Which tag is used to create a line break in HTML?", options: ["<break>", "<br>", "<lb>", "<hr>"], answer: "<br>" },
  { question: "What does CSS stand for?", options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"], answer: "Cascading Style Sheets" },
  { question: "Which property is used to change the background color in CSS?", options: ["color", "bgcolor", "background-color", "bg-color"], answer: "background-color" },
  { question: "How do you make text bold in CSS?", options: ["font-weight: bold;", "text-style: bold;", "font: bold;", "weight: bold;"], answer: "font-weight: bold;" },
  { question: "Which CSS property is used to change text color?", options: ["text-color", "font-color", "color", "foreground-color"], answer: "color" },
  { question: "Which symbol is used to select an ID in CSS?", options: ["#", ".", "!", "@"], answer: "#" },
  { question: "Which symbol is used to select a class in CSS?", options: [".", "#", "*", "%"], answer: "." },
  { question: "Which of the following is a JavaScript data type?", options: ["function", "number", "boolean", "All of the above"], answer: "All of the above" },
  { question: "Which keyword is used to declare a variable in JavaScript?", options: ["let", "var", "const", "All of the above"], answer: "All of the above" },
  { question: "What is the correct syntax to output 'Hello World' in JavaScript?", options: ["echo 'Hello World'", "console.log('Hello World')", "print('Hello World')", "document.write('Hello World')"], answer: "console.log('Hello World')" },
  { question: "What does DOM stand for?", options: ["Document Object Model", "Data Object Model", "Digital Output Mechanism", "Document Oriented Module"], answer: "Document Object Model" },
  { question: "How do you write an 'if' statement in JavaScript?", options: ["if i = 5 then", "if (i == 5)", "if i == 5 then", "if i = 5"], answer: "if (i == 5)" },
  { question: "How can you add a comment in JavaScript?", options: ["// comment", "# comment", "<!-- comment -->", "/* comment */"], answer: "// comment" },
  { question: "Which method is used to add a new element to an array?", options: ["push()", "pop()", "add()", "insert()"], answer: "push()" },
  { question: "Which event occurs when the user clicks on an HTML element?", options: ["onhover", "onchange", "onclick", "onsubmit"], answer: "onclick" },
  { question: "How do you find the length of an array in JavaScript?", options: ["arr.size", "arr.length", "arr.count", "arr.total"], answer: "arr.length" },
  { question: "What will `typeof null` return in JavaScript?", options: ["object", "null", "undefined", "boolean"], answer: "object" }
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
