const searchBotton = document.getElementsByClassName("fa-solid fa-magnifying-glass icon")[0]
const searchCon = document.getElementsByClassName("search-con")[0]
const remove = document.getElementsByClassName("cancel")[0]
const ulList = document.getElementById("navList")
var count = 0
const signupClick = document.getElementById("signup1")
const signupList = document.getElementsByClassName("signUp")[0]
const closet = document.getElementsByClassName("close")[0]
const loginClick = document.getElementById("login1")
const loginList = document.getElementsByClassName("login")[0]
const loginClose = document.getElementsByClassName("loginClose")[0]
const bankloginClick = document.getElementById("banklogin")
function switchDisplay(){
    var list =ulList.children
   count = 0
   for (let i in list){
       if (count < 6){
            list[count].style.display = "none"
       }
       count +=1
       searchCon.style.display = "block"
       searchBotton.style.display = "none"
   } 
}
function removeDisplay(){
    var list =ulList.children
    searchCon.style.display = "none"
    for (let i in list){
        if(list[i].style.display = "none"){
            list[i].style.display = "block"
            searchCon.style.display = "none"
            searchBotton.style.display = "block"
        }
    }
    
}

function OpensignUp(){
    signupList.style.display = "block"
    Closelogin()
}

function ClosesignUp(){
    signupList.style.display = "none"

}

function Openlogin(){
    loginList.style.display = "block"
    ClosesignUp()
}

function Closelogin(){
    loginList.style.display = "none"
}

signupClick.addEventListener("click",OpensignUp)
closet.addEventListener("click",ClosesignUp)
loginClick.addEventListener("click",Openlogin)
loginClose.addEventListener("click", Closelogin)
bankloginClick.addEventListener("click", Openlogin)
searchBotton.addEventListener("click",switchDisplay)
remove.addEventListener("click",removeDisplay)