//Ocultando datos de usuario invitado
console.log(localStorage.getItem("logged"));
if(localStorage.getItem("logged") != "true"){
    let items = document.querySelectorAll(".logged-user");
    items.forEach(item => {
        item.style.display ="none"
    });           
}
//Mostrando la información del juego
getGameByName();
function getGameByName(){
    const route = window.location.search;
    const params = new URLSearchParams(route);
    const name = params.get("name");
    let gameBanner = document.querySelector(".game-cover-image");
    let gameName = document.querySelector(".game-name");
    let gameDescription = document.querySelector(".game-description-text");
    let gamePrice = document.querySelector(".game-price");
    let gamePicture = document.querySelector(".game-img");
    let categoryContainer = document.querySelector(".game-category-container");
    
    fetch("https://spartan-videogames.herokuapp.com/videoGameView?name="+name,{
        method:"GET",
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res => res.json())
    .catch(err  => {
        console.log("ha ocurrido un error"+err)
    })
    .then(res => {
        if(res.category1 != null){
            categoryContainer.innerHTML = categoryContainer.innerHTML+`
            <a class="game-category">${res.category1 }</a>
            `
        }
        if(res.category2 != null){
            categoryContainer.innerHTML = categoryContainer.innerHTML+`
            <a class="game-category">${res.category2 }</a>
            `
        }
        if(res.category3 != null){
            categoryContainer.innerHTML = categoryContainer.innerHTML+`
            <a class="game-category">${res.category3 }</a>
            `
        }
        gameBanner.src = res.banner;            
        gameName.textContent = res.name;           
        gameDescription.textContent = res.description;          
        gamePrice.textContent = "GTQ "+res.price;          
        gamePicture.src = res.picture;
        if(localStorage.getItem("logged")){
            getGameComments()           
        }
    })        
}
//Ingresando un nuevo comentario
let publishBtn = document.querySelector(".publish-comment");
publishBtn.addEventListener("click",newComment)
function newComment(){
    let userName = localStorage.getItem("userName");
    let gameName = document.querySelector(".game-name").textContent;
    let comment = document.querySelector("#new-review").value;
    if(comment != ""){
        fetch ("https://spartan-videogames.herokuapp.com/newComment",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'userName': userName,            
                'gameName': gameName,          
                'description': comment          
            })
        }).then(res => res.json())
        .catch(err  => {
            window.alert("Ocurrio un error")
        })
        .then(res =>{
            // Verificando respuesta
            if(res.state =="ok"){
                window.alert(res.message)
                window.location.reload()
            }
            else{
                window.alert(res.message)
            }
        })
    }else{
        window.alert("Ingresa un comentario")
    }
}
//Recuperando los comentarios
function getGameComments(){
    let gameCommentsContainer = document.querySelector(".game-comments-container")
    let gameName = document.querySelector(".game-name").textContent;
    fetch("https://spartan-videogames.herokuapp.com/getComments",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            'game': gameName,                   
        })
    }).then(res => res.json())
    .catch(err  => {
        console.log("ha ocurrido un error"+err)
    })
    .then(res => {
        res.forEach(comment => {
            gameCommentsContainer.innerHTML = gameCommentsContainer.innerHTML + `
            <div class="col-6 mb-4">
                <div class="review-container">
                    <div class="mr-4">
                        <p class="review-name m-0">${comment.name}</p>
                        <p class="review-date m-0">${comment.date}/2020</p>
                    </div>
                    <p class="review-content m-0 mt-2">${comment.description}</p>
                </div>
            </div>
            `

        });
    })        
}