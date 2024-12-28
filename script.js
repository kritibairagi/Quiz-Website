const quizData = [
  {
    question: "What does HTML stands for?",
    options: [
      "Hypertext Markup Language",
      "Hyper Transfer Markup Language",
      "Hypertext Machine Language",
      "Hyperlink and Text Markup Language",
    ],
    correct: 0,
  },
  {
    question: "How to add a background color in HTML?",
    options: [
      "<marquee bg color:'red'>",
      "<marquee bg-color ='red'>",
      "<marquee bgcolor ='red'>",
      "<marquee color ='red'>",
    ],
    correct: 2,
  },
  {
    question: "<input> tag is - ",
    options: [
      "a format tag.",
      "an empty tag.",
      "All of the above",
      "None of the above",
    ],
    correct: 1,
  },
  {
    question: "CSS stands for?",
    options: [
      "Cascading Style Sheet",
      "Costume Style Sheet",
      "Cascading System Style",
      "None of the above",
    ],
    correct: 0,
  },
  {
    question: "How to write comments in CSS?",
    options: [
      "/**/",
      "//",
      "#",
      "All of the above",
    ],
    correct: 0,
  },
  {
    question: "What are the different types of gradients in CSS?",
    options: [
      "Linear Gradients",
      "Conic Gradients",
      "Radial Gradients",
      "All of the above",
    ],
    correct: 3,
  },
  {
    question: "What will be the output of the following code snippet? print(typeof(NaN))",
    options: [
      "Object",
      "Number",
      "String",
      "None of the above",
    ],
    correct: 1,
  },
  {
    question: "What will be the output of the following code snippet? a=[1,2,3,4,5];<br> print(a.slice(2,4));",
    options: [
      "3,4",
      "2,3",
      "3,4,5",
      "2,3,4",
    ],
    correct: 0,
  },
  {
    question: "When an operator's value is NULL, the typeof returned by the unary operator is:",
    options: [
      "Boolean",
      "Undefined",
      "Object",
      "Integer",
    ],
    correct: 2,
  },
  {
    question: "Which of the following keywords is used to define a variable in JavaScript?",
    options: [
      "var",
      "let",
      "Both A and B",
      "None of the above",
    ],
    correct: 2,
  },

];
// Select Elements
const startBtn = document.getElementById("start");
const infoBox = document.querySelector(".info_box");
const quitBtn = document.getElementById("quit");
const continueBtn = document.getElementById("continue");
const quizBox = document.querySelector(".quiz_box");
const questionEl = document.getElementById("question");
const options = document.querySelectorAll(".answer");
const optionLabels = [document.getElementById("option-1"), document.getElementById("option-2"), document.getElementById("option-3"), document.getElementById("option-4")];
const submitBtn = document.getElementById("submit");
// const nextBtn = document.getElementById("next");
const resultBox = document.querySelector(".result_box");
const replayBtn = document.getElementById("replay");
const resultQuitBtn = document.getElementById("result-quit");
const currentQuestionEl = document.getElementById("current-question");
const timeEl = document.getElementById("time");
const correctCountEl = document.getElementById("correct-count");
const wrongCountEl = document.getElementById("wrong-count");
const notAttemptedEl = document.getElementById("not-attempted-count");

let currentQuestion = 0;
let score = 0;
let timer;
let timeRemaining = 15;
let correctCount = 0;
let wrongCount = 0;
let notAttemptedCount = 0;

// Show/Hide Boxes
const showBox = (box) => box.classList.remove("hidden");
const hideBox = (box) => box.classList.add("hidden");

// Start Button Click
startBtn.onclick = () => {
  showBox(infoBox);
  hideBox(startBtn.parentElement);
};

// Quit Button Click
quitBtn.onclick = () => {
  hideBox(infoBox);
  showBox(startBtn.parentElement);
};

// Continue Button Click
continueBtn.onclick = () => {
  hideBox(infoBox);
  showBox(quizBox);
  loadQuestion();
  startTimer();
};

// Load Questions
function loadQuestion() {
  const questionData = quizData[currentQuestion];
  questionEl.innerHTML = `Question ${currentQuestion + 1}: ${questionData.question}`;
  questionData.options.forEach((option, index) => {
    optionLabels[index].innerText = option;
  });
  //show the question number along with the question
  currentQuestionEl.innerText = currentQuestion + 1;
  resetOptions();
}

// Reset Options
function resetOptions() {
  options.forEach(option => (option.checked = false));
}

// Submit Button Click
submitBtn.onclick = () => {
  const selectedOption = Array.from(options).find(option => option.checked);
  if (selectedOption) {
    const answerIndex = Array.from(options).indexOf(selectedOption);
    if (answerIndex === quizData[currentQuestion].correct) {
      correctCount++;
    }
    else{
      wrongCount++;
    }
    nextQuestion();
  } else {
    notAttemptedCount++;
    alert("Please select an answer!");
  }
};

// Next Question
function nextQuestion() {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion();
    resetTimer();
  } else {
    showResult();
  }
}

// Start Timer
function startTimer() {
  timeRemaining = 15;
  timer = setInterval(() => {
    timeRemaining--;
    timeEl.innerText = `00:${timeRemaining < 10 ? "0" : ""}${timeRemaining}`;

    if (timeRemaining <= 0) {
      clearInterval(timer);
      notAttemptedCount++;
      nextQuestion();
    }
  }, 1000);
}

// Reset Timer
function resetTimer() {
  clearInterval(timer);
  startTimer();
}

// Show Result
function showResult() {
  hideBox(quizBox);
  showBox(resultBox);
  correctCountEl.innerText = correctCount;
  wrongCountEl.innerText = wrongCount;
  notAttemptedEl.innerText = quizData.length - (correctCount + wrongCount);
}
// Replay Button Click
replayBtn.onclick = () => {
  hideBox(resultBox);
  showBox(quizBox);
  currentQuestion = 0;
  correctCount = 0;
  wrongCount = 0;
  notAttemptedCount = 0;
  loadQuestion();
  resetTimer();
};

// Quit Button Click in Result Box
resultQuitBtn.onclick = () => {
  hideBox(resultBox);
  showBox(startBtn.parentElement); // Go back to main menu
  currentQuestion = 0;
  correctCount = 0;
  wrongCount = 0;
  notAttemptedCount = 0;
};

// Next Button Click
nextBtn.onclick = nextQuestion;

// // Responsiveness (adjust font size and layout on window resize)
// window.onresize = () => {
//   const width = window.innerWidth;
//   if (width <= 480) {
//     document.body.style.fontSize = "14px";
//     quizBox.style.width = "100%";
//   } else if (width <= 768) {
//     document.body.style.fontSize = "16px";
//     quizBox.style.width = "90%";
//   } else {
//     document.body.style.fontSize = "18px";
//     quizBox.style.width = "500px";
//   }
// };

// Initial load
window.onresize();