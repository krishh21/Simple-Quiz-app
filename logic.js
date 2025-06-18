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
let userAnswers = Array(quizData.length).fill(null);
let timeLeft = 60;
let timer;

// Elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const feedbackEl = document.getElementById("feedback");
const resultEl = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");
const timerEl = document.getElementById("timer");
const progressEl = document.getElementById("progress"); // ✅ corrected from 'progress-bar'

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = `Q${currentQuestion + 1}. ${q.question}`;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.disabled = userAnswers[currentQuestion] !== null;

    // Style selected answer
    if (userAnswers[currentQuestion] === option) {
      btn.classList.add(userAnswers[currentQuestion] === q.answer ? "correct" : "incorrect");
    }

    btn.onclick = () => {
      if (userAnswers[currentQuestion] !== null) return;

      userAnswers[currentQuestion] = option;

      if (option === q.answer) {
        btn.classList.add("correct");
        feedbackEl.textContent = "✅ Correct!";
      } else {
        btn.classList.add("incorrect");
        feedbackEl.textContent = "❌ Incorrect!";
      }

      // Disable all options after selection
      Array.from(optionsEl.children).forEach(b => b.disabled = true);
    };

    optionsEl.appendChild(btn);
  });

  updateProgressBar();
}

function updateProgressBar() {
  const progress = ((currentQuestion + 1) / quizData.length) * 100;
  progressEl.style.width = `${progress}%`;
}

nextBtn.onclick = () => {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    endQuiz();
  }
};

prevBtn.onclick = () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
};

restartBtn.onclick = () => {
  currentQuestion = 0;
  score = 0;
  userAnswers.fill(null);
  resultEl.textContent = "";
  feedbackEl.textContent = "";
  restartBtn.style.display = "none";
  nextBtn.style.display = "inline-block";
  prevBtn.style.display = "inline-block";
  startTimer();
  loadQuestion();
};

function endQuiz() {
  clearInterval(timer);
  score = userAnswers.filter((ans, idx) => ans === quizData[idx].answer).length;
  resultEl.textContent = `You scored ${score} out of ${quizData.length}`;
  restartBtn.style.display = "inline-block";
  nextBtn.style.display = "none";
  prevBtn.style.display = "none";
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 60;
  timer = setInterval(() => {
    timerEl.textContent = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    }
    timeLeft--;
  }, 1000);
}

// Start quiz
startTimer();
loadQuestion();



  
   
