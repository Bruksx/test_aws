const nav_list = document.getElementsByTagName("ul")[0]
const over_view = document.getElementById("overview1")
const socialclick = document.getElementById("social1")
const dashboardview  = document.getElementsByClassName("overview")[0]
const quickTranscationView = document.getElementsByClassName("quick-transaction")[0]
const socialview = document.getElementsByClassName("social")[0]
const overview = document.getElementById("overview1")
const historyList = document.getElementsByClassName("history")[0]
const transactionlick = document.getElementById("transition1")
const transferclick = document.getElementById("transfer1")
const transferList = document.getElementsByClassName("transfer")[0]
const profileclick = document.getElementById("profile1")
const profilelist = document.getElementsByClassName("managementdiv")[0]
function siblingRadius(){
    var top_sib = this.previousElementSibling
    var bottom_sib = this.nextElementSibling

    if(top_sib !=null){
        top_sib.style.borderBottomRightRadius = "20px"
        }
        bottom_sib.style.borderTopRightRadius = "20px"
}
function reverseSiblingRadius(){
    var top_sib = this.previousElementSibling
    var bottom_sib = this.nextElementSibling

    if(top_sib !=null){
        top_sib.style.borderBottomRightRadius = "0px"
        }
        bottom_sib.style.borderTopRightRadius = "0px"
}
for (let i in nav_list.children){
    console.log(nav_list.children[i])
    if (typeof nav_list.children[i] === "object"){
        nav_list.children[i].addEventListener("mouseover", siblingRadius)
        nav_list.children[i].addEventListener("mouseout", reverseSiblingRadius)
    }
}

function openSocial(){
    socialview.style.display = "block"
    closeOverview()
    closeTransaction()
    closeTransfer()
    closeProfile()
}

function closeSocial(){
    socialview.style.display = "none"
}

function openOverview(){
    quickTranscationView.style.display = "block"
    dashboardview.style.display = "block"
    closeSocial()
    closeTransaction()
    closeTransfer()
    closeProfile()
}
function closeOverview(){
    quickTranscationView.style.display = "none"
    dashboardview.style.display = "none"
}

function openTransaction(){
    historyList.style.display = "block"
    closeOverview()
    closeSocial()
    closeTransfer()
    closeProfile()
}

function closeTransaction(){
    historyList.style.display = "none"
}

function openTransfer(){
    transferList.style.display = "block"
    closeOverview()
    closeSocial()
    closeTransaction()
    closeProfile()
}

function closeTransfer(){
    transferList.style.display = "none"
}
function openProfile(){
    profilelist.style.display = "block"
    closeOverview()
    closeSocial()
    closeTransaction()
    closeTransfer()

}

function closeProfile(){
    profilelist.style.display = "none"

}


socialclick.addEventListener("click",openSocial)
overview.addEventListener("click",openOverview)
transactionlick.addEventListener("click",openTransaction)
transferclick .addEventListener("click",openTransfer)
profileclick.addEventListener("click",openProfile)
