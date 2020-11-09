
let isLogged = localStorage.getItem("logged")
let logoutBtn = document.querySelector(".logout")
logoutBtn.addEventListener("click",function(){
    localStorage.clear(); 
    window.location = "/ui/index.html"

})
if(isLogged){
    let userName = localStorage.getItem("userName")
    let userRole = localStorage.getItem("userRole")
    //Mostramos perfil logeado 
    if(userRole=="admin"){
        //Es admin
    }else{
        //Es usuario normal
        let navElements = document.querySelectorAll(".admin-action")
        navElements.forEach(navElement => {
            navElement.style.display ="none"
        });
    }
}else{
    //es invitado
    let navElements = document.querySelectorAll(".user-logged")
    navElements.forEach(navElement => {
        navElement.style.display ="none"
    });
    let userAction = document.querySelector(".user-invite")
    userAction.classList.add("d-block")
    let logout = document.querySelectorAll(".logout")
    logout.forEach(item => {
        item.classList.add("d-none")
    });
}