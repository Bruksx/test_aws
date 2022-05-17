const bars = document.getElementsByClassName("fa-bars")[0]
const lastList = document.getElementById("navListLast")
const check = document.getElementsByClassName("look")[0]
const cancel = document.getElementsByClassName("delete")[0]
const undo = document.getElementsByClassName("erase")[0]
const test = document.getElementsByClassName("find")[0]

function switchBars(){
    lastList.style.display="block"
    bars.style.visibility="hidden"
    cancel.style.visibility="visible"
    closeBar()
}
function cancleBar(){
    lastList.style.display="none"
    bars.style.visibility="visible"
    cancel.style.visibility="hidden"
}
function searchBar(){
    test.style.display="block"
    check.style.visibility="hidden"
    undo.style.visibility="visible"
    cancleBar()
}
function closeBar(){
    test.style.display="none"
    check.style.visibility="visible"
    undo.style.visibility="hidden"
    
}


bars.addEventListener("click",switchBars)
cancel.addEventListener("click",cancleBar)
check.addEventListener("click",searchBar)
undo.addEventListener("click",closeBar)
