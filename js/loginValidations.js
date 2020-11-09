'use strict'
// Función para registrar cuenta ------------------------------------------
// Obteniendo el botón de registrar y escuchando
try{
    let newAccountBtn = document.querySelector("#new-account-button");
    newAccountBtn.addEventListener("click",createUser);
    
} catch (error) {
    
}
// Función para crear usuario
function createUser(){
    // Obteniendo valores de los inputs
    let name = document.querySelector("#name").value;
    let lastName = document.querySelector("#last-name").value;
    let userName = document.querySelector("#user-name").value;
    let password = document.querySelector("#password").value;
    let confirmPassword = document.querySelector("#confirm-password").value;
    // Asignando variable con caracteres especiales
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    // Comparando si se cumplen las restricciones
    if(name != "" && lastName != "" && userName != "" && password != "" && confirmPassword != "" &&  confirmPassword == password &&  isNaN(userName.split("")[0]) && format.test(userName) == false){
        // Haciendo una petición al servidor
        fetch("https://spartan-videogames.herokuapp.com/newUser",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "last_name": lastName,
                "user_name": userName,
                "password":password,
                "user_type": "normal"
                
            })
        }).then(res => res.json())
        .catch(err  => {
            window.alert("Ocurrio un error al intentar crear tu usuario")
        })
        .then(res => {
            // Verificando estado de respuesta y cambiando vista a login
            if(res.state == "ok"){
                window.alert("Tu usuario ha sido creado con éxito")
                window.location = "/ui/login.html"
            }
            else{
                window.alert("El nombre de usuario no está disponible")
            }
        })
    }
    else{
        window.alert("Verifica que: los datos esten llenos, la contraseña coincida y que tu nombre de usuario no inice con un número y no contenga caracteres especiales")
    }
}
// Función para recuperar contraseña ------------------------------------------
// Obteniendo el botón de inicio y escuchando
try {
    let recoveryPasswordBtn = document.querySelector("#recovery-password-btn");
    recoveryPasswordBtn.addEventListener("click",recoveryPassword);
} catch (error) {
    
}
// función para recuperar contraseña
function recoveryPassword(){
    // Obteniendo nombre de usuario
    let userName = document.querySelector('#user-name').value
    // Ejecutanto la petición
    fetch ("https://spartan-videogames.herokuapp.com/getPassword",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            'user_name': userName            
        })
    }).then(res => res.json())
    .catch(err  => {
        window.alert("Ocurrio un error al intentar recuperar la constraseña")
    })
    .then(res =>{
        // Verificando respuesta
        if(res.state =="ok"){
            window.alert(res.message)
        }
        else{
            window.alert(res.message)
        }
    })
}

// Función para iniciar sesión ------------------------------------------
// Obteniendo el botón de iniciar y escuchando
try{
    let loginBtn = document.querySelector("#login-btn");
    loginBtn.addEventListener("click",login);
    
} catch (error) {
    
}
// Función para inicar sesión
function login(){
    // Obteniendo valores de los inputs
    let userName = document.querySelector("#user-name").value;
    let password = document.querySelector("#password").value;
    // Asignando variable con caracteres especiales
    // Comparando si se cumplen las restricciones
    if(userName != "" && password != ""){
        // Haciendo una petición al servidor
        fetch("https://spartan-videogames.herokuapp.com/login",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "user_name": userName,
                "password":password                
            })
        }).then(res => res.json())
        .catch(err  => {
            window.alert("Ocurrio un error al intentar iniciar sesión")
        })
        .then(res => {
            // Verificando estado de respuesta y cambiando vista a login
            if(res.state == "ok"){
                window.alert(res.message)
                window.location = "/ui/index.html"
                localStorage.setItem("logged", true);
                localStorage.setItem("userName", userName);
                localStorage.setItem("userRole", res.userRole);
            }
            else{
                window.alert(res.message)
            }
        })
    }
    else{
        window.alert("Verifica que: los datos esten llenos")
    }
}