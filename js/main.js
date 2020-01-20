let quizz = {
  nbQuestion: 0,
  tempAnswerid: 0,
  score: 0
};
function extractUrlParams() {
  var t = location.search.substring(1).split("&");
  var f = [];
  for (var i = 0; i < t.length; i++) {
    var x = t[i].split("=");
    f[x[0]] = x[1];
  }
  return f;
}
init();

function init() {
  let id = extractUrlParams().id;
  let level = extractUrlParams().level;
  let levelName = "débutant";
  if (level == 3) {
    levelName = "expert";
  } else if (level == 2) {
    levelName = "confirmé";
  }

  question(id, levelName);
}

function question(id, levelName) {
  fetch(`http://127.0.0.1:8080/quizz/${id}.json`)
    .then(result => result.json())
    .then(data => {
      document.getElementById("question").innerHTML = data.quizz.fr[0][levelName][quizz.nbQuestion].question;
      document.getElementById("questionCompleted").innerHTML =
        quizz.nbQuestion + 1 + "/" + data.quizz.fr[0][levelName].length;
      let i = 1;
      for (let property of data.quizz.fr[0][levelName][quizz.nbQuestion].propositions) {
        document.getElementById("choiceAnswer").innerHTML += `<div class="custom-control custom-radio">
            <input
              type="radio"
              class="custom-control-input"
              id="choice${i}"
              value="${i}"
            />
            <label class="custom-control-label" for="choice${i}"
              >${property}</label
            >
          </div>`;
        i++;
      }
      if (data.quizz.fr[0][levelName][quizz.nbQuestion].réponse == property) {
        quizz.tempAnswerid = i;
      }
    });
}
function checkAnswer() {
  let i = 1;
  while (i < 4) {
    if (
      document.getElementById(`choice${i}`).value == quizz.tempAnswerid &&
      document.getElementById(`choice${i}`).checked
    ) {
      return true;
    }
    i++;
  }
  return false;
}
function next() {
  checkAnswer();
}
