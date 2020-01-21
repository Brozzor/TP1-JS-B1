initIndex();
function initIndex(){
// cette fonction permet l'affichage des 3 card situer dans le card-deck
      fetch(`http://127.0.0.1:8080/high_score.json`)
      .then(result => result.json())
      .then(data => {
      for (property of data.highscore){
        if (property.id > 3){return;} // permet d'afficher que les 3 premiers
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
        });
     
}

function hideHomeInterface(){
  document.getElementById('mainQuiz').innerHTML = null;
  document.getElementById('banniere').innerHTML = null;
  document.getElementById('displayBestScore').hidden = true;
}

function insertScoreInBoard(){
  fetch(`http://127.0.0.1:8080/high_score.json`)
      .then(result => result.json())
      .then(data => {
      for (property of data.highscore){
        console.log(property.level[0].débutant)
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
});
}

function displayScore(){
  hideHomeInterface();
  document.getElementById('h1title').innerHTML = "Vos meilleurs scores";
  document.getElementById('h3title').innerHTML = "Moyenne : 4/10";
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
  `;
  insertScoreInBoard();
  
}