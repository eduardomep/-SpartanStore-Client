getGameLibary()
function getGameLibary(){
    let gameLibraryContainer = document.querySelector(".game-library")
    fetch("https://spartan-videogames.herokuapp.com/getVideoGames",{
        method:"GET",
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res => res.json())
    .catch(err  => {
        console.log("ha ocurrido un error"+err)
    })
    .then(res => {
        res.forEach(videoGame => {
            gameLibraryContainer.innerHTML = gameLibraryContainer.innerHTML + `
                <div class='col-12 col-md-4 col-lg-3 d-flex'>
                <a class='game-link' href='game-view.html?name=${videoGame.name}'><div class='game layout-game'>
                        <img clas='game-img img-fluid' src='${videoGame.picture}' alt='Game Name'>
                        <div class='game-description p-3'>
                            <h2 class='game-name'>${videoGame.name}</h2>
                            <p class='game-price'>GTQ ${videoGame.price}</p>
                            <div class='game-category-container'>

                                <a class='game-category'>${videoGame.category1}</a>
                                <a class='game-category'>${videoGame.category2}</a>
                                <a class='game-category'>${videoGame.category3}</a>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            `
        });
    })        
}