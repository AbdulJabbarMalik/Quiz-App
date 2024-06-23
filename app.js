var questions = [
  {
    question: "What does HTML stand for?",
    option1: "Hyperlinks and Text Markup Language",
    option2: "Hypertext Markup Language",
    option3: "Home Tool Markup Language",
    correctOption: "Hypertext Markup Language",
  },
  {
    question: "Who is making the Web standards?",
    option1: "Google",
    option2: "The World Wide Web Consortium",
    option3: "Microsoft",
    correctOption: "The World Wide Web Consortium",
  },
  {
    question: "Choose the correct HTML element for the largest heading:",
    option1: "<heading>",
    option2: "<h6>",
    option3: "<h1>",
    correctOption: "<h1>",
  },
  {
    question: "What is the correct HTML element for inserting a line break?",
    option1: "<linebreak>",
    option2: "<br>",
    option3: "<break>",
    correctOption: "<br>",
  },
  {
    question: "What is the correct HTML for adding a background color?",
    option1: '<body bg="yellow">',
    option2: "<background>yellow</background>",
    option3: '<body style="background-color:yellow;">',
    correctOption: '<body style = "background-color:yellow;" >',
  },
  {
    question: "Choose the correct HTML element to define important text:",
    option1: "<strong>",
    option2: "<b>",
    option3: "<i>",
    correctOption: "<strong>",
  },
  {
    question: "Choose the correct HTML element to define emphasized text:",
    option1: "<italic>",
    option2: "<i>",
    option3: "<em>",
    correctOption: "<em>",
  },
  {
    question: "What is the correct HTML for creating a hyperlink?",
    option1: "<a> http://www.w3schools.com </a>",
    option2: '<a href = "http://www.w3schools.com" > W3Schools </a>',
    option3: '<a url = "http://www.w3schools.com" > W3Schools.com </a>',
    correctOption: '<a href = "http://www.w3schools.com" > W3Schools </a>',
  },
  {
    question: "Which character is used to indicate an end tag?",
    option1: "*",
    option2: "/",
    option3: "<",
    correctOption: "/",
  },
];

var inp = prompt(`Enter Your Roll No:`);

var getques = document.getElementById("ques");
var getopt1 = document.getElementById("opt1");
var getopt2 = document.getElementById("opt2");
var getopt3 = document.getElementById("opt3");

var getbtn = document.getElementById("btn");
var sub_btn = document.getElementById("s-btn");
let corr_ans = document.getElementById("crt_ques");

var index = 0;
var score = 0;

var container = document.querySelector(".container");

var getop = document.getElementsByName("option");

// progress bar/////////
var progresscontainer = document.querySelector(".pro-wrap");
var progress_bar = document.querySelector(".progress-bar");
var progress_value = document.querySelector(".progbar-value");
var res_msg = document.getElementById("result-msg");

function nextques() {
  for (var i = 0; i < getop.length; i++) {
    if (getop[i].checked) {
      var slc_ans = getop[i].parentElement.innerText;
      var crt_ans = questions[index - 1].correctOption;

      if (crt_ans.trim() == slc_ans.trim()) {
        score++;
      }
    }

    getop[i].checked = false;
  }
  getbtn.disabled = true;
  getbtn.style.opacity = "0.7";

  if (index > questions.length - 1) {
    alert("Questons End");
    for (var i = 0; i < getop.length; i++) {
      getop[i].disabled = true;
    }
    getbtn.style.display = "none";
    sub_btn.style.display = "block";
  } else {
    getques.innerText = questions[index].question;

    getopt1.innerText = questions[index].option1;
    getopt2.innerText = questions[index].option2;
    getopt3.innerText = questions[index].option3;

    index++;
  }
}

nextques();

function clicked() {
  getbtn.disabled = false;
  getbtn.style.opacity = "1";
  getbtn.style.boxShadow = "3px 3px 8px black";
}

/// For Time Duration /////////////////////////
var Time = document.getElementById("time");
var sec = 60;
var min = 20;
var duration = setInterval(function time() {
  Time.innerText = min + " : " + sec;
  sec--;
  if (min == 0 && sec == 0) {
    startprogress();
  } else if (sec == 0) {
    sec = 60;
    min--;

    if (min <= 10) {
      Time.style.backgroundColor = "red";
    }
  }
}, 1000);

////////////////////////

function startprogress() {
  // for (var i = 0; i < getop.length; i++) {
  //   getop[i].disabled = true;
  // }

  // progresscontainer.style.display = "block";
  submit();
}
///////////////////////

function submit() {
  clearInterval(duration);

  for (var i = 0; i < getop.length; i++) {
    getop[i].disabled = true;
  }
  progresscontainer.style.display = "block";

  let start = 0;
  let progressval = (score / questions.length) * 100;

  let progress = setInterval(() => {
    if(progressval === 0){
      progress_value.textContent = `0%`
      progress_bar.style.background = `conic-gradient(rgb(56, 56, 206) 0deg, #ededed 0deg)`;
    }
    else{

      start++;
      progress_value.textContent = `${start}%`;
      progress_bar.style.background = `conic-gradient(rgb(56, 56, 206) ${
        start * 3.6
      }deg, #ededed 0deg)`;
    }
    if (start == progressval.toFixed()) {
      clearInterval(progress);
    } 
    if (progressval >= 70) {
      res_msg.textContent = "Passed 👍";
    } else {
      res_msg.textContent = "Failed 🙁";
    }
    corr_ans.textContent = `Correct answers: ${score} / ${questions.length}`;
  }, 10);
}
