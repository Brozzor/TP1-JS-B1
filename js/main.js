let quizz = {
  // variable globale permettant la communication entre les functions des informations de base pour savoir ou nous en sommes dans le script , score
  nbQuestion: 0,
  tempAnswerid: 0,
  score: 0,
  timer: 15,
  citation: "",
  authorCitation: ""
};

function extractUrlParams() {
  // permet d'extraire les parametres dans l'url, tel que (id, level)
  var t = location.search.substring(1).split("&");
  var f = [];
  for (var i = 0; i < t.length; i++) {
      var x = t[i].split("=");
      f[x[0]] = x[1];
  }
  return f;
}
init();
generatorCitation()


function init() {
  // Cette fonction permet l'initialisation de depart et a chaque question de remettre au propre les reponse que l'utilisateur peut choisir
  let id = extractUrlParams().id;
  let level = extractUrlParams().level;
  let levelName = "débutant";
  quizz.timer = 15;
  if (level == 3) {
      levelName = "expert";
  } else if (level == 2) {
      levelName = "confirmé";
  }
  document.getElementById("choiceAnswer").innerHTML = null;
  setTimeout("colorModify('init')", 1000);
  question(id, levelName);
}

timerStart();

function question(id, levelName) {
  // cette fonctions permet de rechercher une question et de l'afficher , elle permet aussi de sauvegarder la réponse dans une variable global appeler quizz.tempAnswerid
  fetch(`http://127.0.0.1:8080/quizz/${id}.json`)
      .then(result => result.json())
      .then(data => {
          document.getElementById("question").innerHTML = data.quizz.fr[0][levelName][quizz.nbQuestion].question;
          document.getElementById("themeTitle").innerHTML = data.thème;
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
              if (data.quizz.fr[0][levelName][quizz.nbQuestion].réponse == property) {
                  quizz.tempAnswerid = i;
              }
              i++;
          }

      });
}

function checkAnswer() {
  // cette fonction permet de verifier la réponse si elle est correct
  let i = 1;
  while (i <= 4) {
      if (document.getElementById(`choice${i}`).value == quizz.tempAnswerid && document.getElementById(`choice${i}`).checked) {
          return true;
      }
      i++;
  }
  return false;
}

function colorModify(color) {
  // change les couleurs lors d'une victoire , d'une defaite ou simplement une remise a 0
  let classNameColor = "btn btn-dark";
  if (color == "win") {
      color = "#28a745";
      classNameColor = "btn btn-success";
  } else if (color == "loose") {
      color = "#ff4444";
      classNameColor = "btn btn-danger";
  } else if (color == "init") {
      color = "#111";
      classNameColor = "btn btn-dark";
      classNameColorBadge = "badge badge-light";
  } else if (color == "lowTime") {
      color = "#f57c00";
      classNameColor = "btn btn-orange";
      classNameColorBadge = "badge red";
  }
  document.body.style.background = color;
  document.getElementById("nextButton").className = classNameColor;
  document.getElementById("timer").className = classNameColorBadge;
}

function next() {
  // cette fonction permet de changer de question
  if (checkAnswer()) {
      quizz.score++;
      colorModify('win')
  } else {
      colorModify('loose')
  }
  quizz.tempAnswerid = 0;
  quizz.nbQuestion++;

  init();
}

function timerStart() {
  if (quizz.timer > 7950) {
      return;
  } // permet de supprimer le timer a la fin d'une partie
  // magnifique timer recurssif
  if (quizz.timer >= 0) {
      if (quizz.timer < 10) {
          document.getElementById("timer").innerText = "00:0" + quizz.timer;
          if (quizz.timer < 5) {
              colorModify('lowTime')
          }
      } else {
          document.getElementById("timer").innerText = "00:" + quizz.timer
      }
  } else {
      next();
  }
  quizz.timer--;
  setTimeout(`timerStart()`, 1000);
}

function randomNb(max) {
  // genere un chiffre semi-aleatoire , cette fonction est utiliser pour trouver une citation
  return Math.floor(Math.random() * Math.floor(max));
}

function generatorCitation() {
  // choisit une citation semi-aleatoire parmis la base de donnée en json
  fetch(`http://127.0.0.1:8080/citation.json`)
      .then(result => result.json())
      .then(data => {
          let nb = randomNb(data.citation.length);
          quizz.citation = data.citation[nb].citation;
          quizz.authorCitation = data.citation[nb].author;
      });
}

function endGame() {
  // Pour eviter un bug un peu bete avec le timer j'ai du diviser la fonction endGame en 2
  quizz.timer = 8000; // permet de supprimer le timer a la fin d'une partie
  setTimeout(`endGame1()`, 1000);
}


function endGame1() {
  // création de la page de fin de partie
  let level = extractUrlParams().level;
  let id = extractUrlParams().id;
  document.getElementById("choiceAnswer").innerHTML = null;
  document.getElementById("question").innerHTML = null;
  document.getElementById("questionCompleted").innerHTML = null;
  document.getElementById("timer").innerText = "Résultat : " + quizz.score + "/10";
  document.getElementById("nextButton").hidden = true;
  document.getElementById("endGameButton").hidden = true;
  document.getElementById("returnHomeButton").hidden = false;
  if (level == 1 || level == 2) {
      document.getElementById("levelUpButton").hidden = false;
      document.getElementById("levelUpButton").href = `http://127.0.0.1:8080/pages.html?id=${id}&level=${parseInt(level)+1}`;
  }
  colorModify(init);
  if ((quizz.score == 10) && (level == 1 || level == 2)) {
      document.getElementById("question").innerHTML = '<font color="#28a745"><center>Tu es quelqu\'un de très cultiver mais tu peux faire mieux en augmentant le niveau sur ce quizz ;)</center></font>';
  } else if ((quizz.score == 10) && (level == 3)) {
      document.getElementById("question").innerHTML = '<font color="#28a745"><center>C\'est pas mal tu as presque le savoir absolut </center></font>';
  } else if (quizz.score >= 7) {
      document.getElementById("question").innerHTML = '<font color="#28a745"><center>C\'est pas mal tu as presque le savoir absolut </center></font>';
  } else if (quizz.score >= 5) {
      document.getElementById("question").innerHTML = '<font color="#f57c00"><center>T\'est pas très malin, tu peux soigner sa en regardant Bfm 30 minutes par jour</center></font>';
  } else if (quizz.score <= 4) {
      document.getElementById("question").innerHTML = '<font color="#ff4444"><center>À ce point-là on peut plus rien faire pour toi</center></font>';
  }
  // affichage des citations automatiques
  document.getElementById("choiceAnswer").innerHTML = `<i><center>\"${quizz.citation}\"</center></i><br><strong><center>par : ${quizz.authorCitation}</center></strong>`;


}