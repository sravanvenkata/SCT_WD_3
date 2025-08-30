    let questions = [
      { // single choice
        question: "What house at Hogwarts does Harry belong to?",
        type: "single",
        options: ["Slytherin", "Gryffindor", "Hufflepuff", "Ravenclaw"],
        answer: 1
      },
      {
        question: "What position does Harry play on his Quidditch team?",
        type: "single",
        options: ["Chaser", "Beater", "Keeper", "Seeker"],
        answer: 3
      },
      {
        question: "Who is the Half-Blood Prince?",
        type: "single",
        options: ["Tom Riddle", "Horace Slughorn", "Severus Snape", "Albus Dumbledore"],
        answer: 2
      },
      {
        question: "What shape is Harry's scar?",
        type: "single",
        options: ["A lightning bolt", "A star", "A snake", "A wand"],
        answer: 0
      },
      {
        question: "What spell is used to disarm an opponent?",
        type: "single",
        options: ["Expelliarmus", "Avada Kedavra", "Alohomora", "Lumos"],
        answer: 0
      },
      {
        question: "Who kills Dumbledore?",
        type: "single",
        options: ["Voldemort", "Snape", "Draco Malfoy", "Bellatrix Lestrange"],
        answer: 1
      },
      {
        question: "What platform at King's Cross does the Hogwarts Express depart from?",
        type: "single",
        options: ["9", "10", "9¾", "8¾"],
        answer: 2
      },
      { // multiple choice
        question: "Which of these are Horcruxes?",
        type: "multiple",
        options: [
          "Harry Potter",
          "Nagini",
          "The Sword of Gryffindor",
          "Tom Riddle's Diary"
        ],
        answer: [0, 1, 3]
      },
      {
        question: "Which characters were part of the Marauders?",
        type: "multiple",
        options: [
          "Remus Lupin",
          "Sirius Black",
          "James Potter",
          "Severus Snape"
        ],
        answer: [0, 1, 2]
      },
      {
        question: "Which spells are Unforgivable Curses?",
        type: "multiple",
        options: [
          "Avada Kedavra",
          "Crucio",
          "Imperio",
          "Expelliarmus"
        ],
        answer: [0, 1, 2]
      }
    ];

    let currentIndex = 0;
    let userAnswers = new Array(questions.length).fill(null);

   function showQuestion(index) {
  const q = questions[index];
  const questionDiv = document.getElementById("question");
  const optionsDiv = document.getElementById("options");
  const nextBtn = document.getElementById("nextBtn");
  const backBtn = document.getElementById("backBtn");

  questionDiv.innerText = q.question;
  optionsDiv.innerHTML = "";

  if (q.type === "single") {
    q.options.forEach((opt, i) => {
      const row = document.createElement("div");
      row.classList.add("option-row");

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "option";
      radio.value = i;
      if (userAnswers[index] === i) radio.checked = true;

      const label = document.createElement("label");
      label.innerText = opt;

      row.appendChild(radio);
      row.appendChild(label);
      optionsDiv.appendChild(row);
    });
  } else if (q.type === "multiple") {
    q.options.forEach((opt, i) => {
      const row = document.createElement("div");
      row.classList.add("option-row");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "option";
      checkbox.value = i;
      if (userAnswers[index] && userAnswers[index].includes(i)) {
        checkbox.checked = true;
      }

      const label = document.createElement("label");
      label.innerText = opt;

      row.appendChild(checkbox);
      row.appendChild(label);
      optionsDiv.appendChild(row);
    });
  }

  backBtn.disabled = index === 0;
  nextBtn.innerText = (index === questions.length - 1) ? "Submit" : "Next";
}


    function saveAnswer() {
      const q = questions[currentIndex];
      if (q.type === "single") {
        const selected = document.querySelector("input[name='option']:checked");
        userAnswers[currentIndex] = selected ? parseInt(selected.value) : null;
      } else {
        const selected = [...document.querySelectorAll("input[name='option']:checked")].map(cb => parseInt(cb.value));
        userAnswers[currentIndex] = selected.length > 0 ? selected : null;
      }
    }

    function nextQuestion() {
      saveAnswer();
      if (currentIndex < questions.length - 1) {
        currentIndex++;
        showQuestion(currentIndex);
      } else {
        finishQuiz();
      }
    }

    function prevQuestion() {
      saveAnswer();
      if (currentIndex > 0) {
        currentIndex--;
        showQuestion(currentIndex);
      }
    }

    function arraysEqual(arr1, arr2) {
      if (!arr1 || !arr2) return false;
      if (arr1.length !== arr2.length) return false;
      return arr1.every(val => arr2.includes(val));
    }

    function finishQuiz() {
      saveAnswer();
      let score = 0;
      let unanswered = 0;

      for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === null) {
          unanswered++;
        } else if (questions[i].type === "single") {
          if (userAnswers[i] === questions[i].answer) score++;
        } else if (questions[i].type === "multiple") {
          if (arraysEqual(userAnswers[i], questions[i].answer)) score++;
        }
      }

      document.getElementById("quiz").innerHTML =
        `<h2>Quiz finished!</h2>
         <p>Score: ${score}/${questions.length}</p>
         <p>Unanswered: ${unanswered}</p>`;
    }

    document.addEventListener("DOMContentLoaded", () => showQuestion(0));
  
document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("start-page").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  loadQuestion(); // start the quiz
});
