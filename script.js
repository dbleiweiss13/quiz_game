var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    question:
      "how do you comment out code in javascript",
    choices: ["/* */", "<!-- -->", "/?", "/"],
    answer: "/* */",
  },
  {
    question:
      "how do you comment out code in html",
    choices: ["/* */", "<!-- -->", "/?", "/"],
    answer: "<!-- -->",
  },
  {
    question:
      "how do you denote a class in css",
    choices: [".", "!", "class", "#"],
    answer: ".",
  },
  {
    question:
      "what of these is not a loop",
    choices: ["while", "do while", "for", "if"],
    answer: "if",
  },

];

var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");

var questionIndex = 0;
var correctCount = 0;
var time = 60;
var intervalId;
var ready = true;

// localStorage.clear();

$('#start-button').on('click',function(){
  renderQuestion()
  $(this).css('display','none')
  $('#game-description').css('display','none')
});

function endQuiz() {
  clearInterval(intervalId);
  
  $('#timer').css('display','none')
  $('.question-divs').css('display','none')
  questionEl.textContent = "All Done!";
  $('#game-description').css('display','unset')
  $('#game-description').text("Game over, You scored " + correctCount);


  // wait 2 seconds and call showHighScore;
  setTimeout(showHighScore, 2000);
}


function updateTime() {
  time--;
  timerEl.textContent = 'Timer: ' + time;
  if (time <= 0) {
    endQuiz();
  }
}

function renderQuestion() {
  if (time == 0) {
    updateTime();
    return;
  }
  
  intervalId = setInterval(updateTime, 1000);
  questionEl.textContent = questions[questionIndex].question;
  
  optionListEl.innerHTML = "";
  questionResultEl.innerHTML = "";
  
  var choices = questions[questionIndex].choices;
  var choicesLenth = choices.length;
  
  for (var i = 0; i < choicesLenth; i++) {
    var questionButton = document.createElement("button");
    questionButton.textContent = choices[i];
    questionButton.setAttribute('class','btn btn-primary questionButtons')
    optionListEl.append(questionButton);
  }
}

function nextQuestion() {
  questionIndex++;
  if (questionIndex === questions.length) {
    time = 0;
  }
  renderQuestion();
  ready = true
}

function checkAnswer(event) {
  if (ready) {
    ready = false
    clearInterval(intervalId);
    if (event.target.matches("button")) {
      var resultTag = document.createElement("p");
      resultTag.setAttribute('class','resultDiv')
      var answer = event.target.firstChild.textContent;
      
      if (answer === questions[questionIndex].answer) {
        resultTag.textContent = "Correct";
        correctCount++;
      } else {
        resultTag.textContent = "Incorrect";
        time = time - 2;
        timerEl.textContent = 'Timer: ' + time;
      }
      questionResultEl.append(resultTag);
    }
    setTimeout(nextQuestion, 2000);
  }
}

optionListEl.addEventListener("click", checkAnswer);




function showHighScore() {
  // write code here
  $('#highscoreForm').removeClass('hidden')
}


$('#high-score-submit').on('click',function(){
  var highscores = JSON.parse(localStorage.getItem("highscores"));
  
  if (highscores == null) {
    highscores = [];
  }

  event.preventDefault();
  var initials = $('#initials').val()
  var newScore = {
    initials: initials,
    score: correctCount
  }
  console.log(newScore)
  console.log (highscores)
  highscores.push(newScore);
  localStorage.setItem("highscores",JSON.stringify(highscores))

  window.location.href = 'highscore.html';
});