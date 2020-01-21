initIndex();
function initIndex(){
    let i = 1;
    while(i <= 2){

const request = async () => {
    const response = await fetch(`http://127.0.0.1:8080/quizz/${i}.json`);
    const json = await response.json();
    return json.fournisseur
}


            document.getElementById('mainQuiz').innerHTML += `
        <div class="card mb-4">

        <div class="view overlay">
          <img class="card-img-top" src="http://127.0.0.1:8080/img/${i}.jpg" alt="Card image cap">
          <a href="http://127.0.0.1:8080/quizz/pages.html?id=${i}&level=${i}">
            <div class="mask rgba-white-slight"></div>
          </a>
        </div>
    
        <div class="card-body">
          <h4 class="card-title">${request()}</h4>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <button type="button" class="btn btn-light-blue btn-md">Read more</button>
    
        </div>
    
      </div>`;
            
            
  
      

        
      i++;
    }
}