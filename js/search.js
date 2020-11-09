//obteniendo categoria y redirigiendo
let searchBtn = document.querySelector(".game-category-search-btn");
searchBtn.addEventListener("click",function(){
    let searchInput = document.querySelector("#game-category-search").value;
    if(searchInput != ""){
        window.location = "/SpartanStore-Client/category-result.html?category="+searchInput;
    }else{
        window.alert("Ingresa una categoria")
    }
})
