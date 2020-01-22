initIndex();
let allQuiz_json3 = sessionStorage.getItem("scoreAll");
let storageScore1 = JSON.parse(allQuiz_json3);

function initIndex() {
    // cette fonction permet l'affichage des 3 card situer dans le card-deck

    for (property of allQuiz.highscore) {
        if (property.id > 3) {
            return;
        } // permet d'afficher que les 3 premiers
        document.getElementById('mainQuiz').innerHTML += `
            <div class="card mb-4">

            <div class="view overlay">
              <img class="card-img-top" src="http://127.0.0.1:8080/img/${property.id}.jpg" alt="Card image cap">
              <a href="http://127.0.0.1:8080/pages.html?id=${property.id}&level=1">
                <div class="mask rgba-white-slight"></div>
              </a>
            </div>
        
            <div class="card-body">
              <h4 class="card-title">${property.name}</h4>
              <p class="card-text">${property.commentary}</p>
              <a href="http://127.0.0.1:8080/pages.html?id=${property.id}&level=1"><button type="button" class="btn btn-dark btn-sm" style="padding: .6rem 1.3rem;
                font-size: .64rem;">Débutant</button></a>
              <a href="http://127.0.0.1:8080/pages.html?id=${property.id}&level=2"><button type="button" class="btn btn-dark btn-sm" style="padding: .6rem 1.3rem;
                font-size: .64rem;">Confirmé</button></a>
              <a href="http://127.0.0.1:8080/pages.html?id=${property.id}&level=3"><button type="button" class="btn btn-dark btn-sm" style="padding: .6rem 1.3rem;
                font-size: .64rem;">Expert</button></a>
        
            </div>
        
          </div>`;
    }


}

function hideHomeInterface() { // permet de cacher la page principal
    document.getElementById('mainQuiz').innerHTML = null;
    document.getElementById('banniere').innerHTML = null;
    document.getElementById('displayBestScore').hidden = true;
}

function insertScoreInBoard() {
    let moyenne = 0;
    let nbNote = 0;
    for (property of storageScore1.highscore) {
        moyenne += parseInt(property.level[0].débutant); //-------------------------------------
        moyenne += parseInt(property.level[0].confirmé);
        moyenne += parseInt(property.level[0].expert);
        nbNote += 3; // ----------------------------------Calcul de la moyenne général ----------
        if (property.id == allQuiz.highscore.length) {
            moyenne = moyenne / nbNote;
            document.getElementById('h3title').innerHTML = `Moyenne : ${moyenne.toFixed(2)}/10`;
        } //--------------------------------------------------------------------------------------
        // remplissage du tableau des scores   
        document.getElementById('boardInput').innerHTML += `
  <tr>
      <th scope="row">${property.id}</th>
      <td>${property.name}</td>
      <td>${property.level[0].débutant}/10</td>
      <td>${property.level[0].confirmé}/10</td>
      <td>${property.level[0].expert}/10</td>
    </tr>
  `;

    }

}

function displayScore() { // permet d'afficher le score
    hideHomeInterface();
    document.getElementById('h1title').innerHTML = "Vos meilleurs scores";
    document.getElementById('h3title').innerHTML = "Moyenne : 5/10";
    document.getElementById('board').innerHTML = `
  <div class="card mb-4">
  <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Nom du quiz</th>
      <th scope="col">Débutant</th>
      <th scope="col">Confirmé</th>
      <th scope="col">Expert</th>
    </tr>
  </thead>
  <tbody id="boardInput">
  </tbody>
</table>
</div>
<a href="http://127.0.0.1:8080/index.html" class="btn btn-light">Revenir à l'acceuil</a>
<button id="resetAllScore" onclick="resetScore()" class="btn btn-danger">Remettre vos scores à zero</button>
  `;
    insertScoreInBoard();

}

function resetScore() { // permet de remettre le score a 0

    for (property of storageScore1.highscore) {
        // vidage du tableau des scores   
        property.level[0].débutant = 0;
        property.level[0].confirmé = 0;
        property.level[0].expert = 0;
    }
    sessionStorage.setItem("scoreAll", JSON.stringify(storageScore1));
    displayScore();
}