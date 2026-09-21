
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    menuBtn.textContent = navMenu.classList.contains("open") ? "✕" : "☰";
  });
}

// Quiz functionality
const questions = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    answer: 1
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    answer: 2
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    answer: 2
  },
  {
    question: "What is the closest star to Earth?",
    options: ["Sirius", "The Sun", "Polaris", "Vega"],
    answer: 1
  },
  {
    question: "Which animal is known for changing its color?",
    options: ["Elephant", "Chameleon", "Penguin", "Tiger"],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const quizNumber = document.getElementById("quizNumber");
const quizResult = document.getElementById("quizResult");
const quizContent = document.getElementById("quizContent");

function loadQuestion() {
  if (!questionElement) return;

  const q = questions[currentQuestion];

  questionElement.textContent = q.question;
  optionsElement.innerHTML = "";

  quizNumber.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  progressBar.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  nextBtn.style.display = "none";

  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option";
    button.textContent = option;

    button.addEventListener("click", () => {
      selectAnswer(index, button);
    });

    optionsElement.appendChild(button);
  });
}

function selectAnswer(index, selectedButton) {
  const correctAnswer = questions[currentQuestion].answer;
  const buttons = optionsElement.querySelectorAll(".option");

  buttons.forEach(button => {
    button.disabled = true;
  });

  if (index === correctAnswer) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("wrong");
    buttons[correctAnswer].classList.add("correct");
  }

  nextBtn.style.display = "inline-flex";
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      quizContent.style.display = "none";
      quizResult.style.display = "block";

      document.getElementById("finalScore").textContent =
        `${score} / ${questions.length}`;
    }
  });
}

const restartBtn = document.getElementById("restartBtn");

if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    quizContent.style.display = "block";
    quizResult.style.display = "none";
    loadQuestion();
  });
}

loadQuestion();

const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});