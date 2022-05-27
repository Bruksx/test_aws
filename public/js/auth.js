const signup_list = document.getElementsByClassName("signUpInput")
const submit = document.getElementById("submit")
const email = document.getElementsByClassName("loginInput")[0]
const password = document.getElementsByClassName("loginInput")[1]
const login_botton = document.getElementById("login")

async function register(){
    var data = new FormData()
    
    for (let i in signup_list){
        data.append(signup_list[i].name, signup_list[i].value)
    }



    var request = await fetch("register", {
        method:"post",
        body: data
    })
    var response = await request.text()
    alert(response)
}



async function login(){
    var data = new FormData()
    data.append(email.name, email.value)
    data.append(password.name, password.value)
    var request =await fetch("login",{
        method:"post",
        body:data
    })
    var response = await request.text()
    console.log(response)
    if (response === "password correct"){
        window.location.href = "profile"
    }
}



submit.addEventListener( "click", register)
login_botton.addEventListener("click",login)
