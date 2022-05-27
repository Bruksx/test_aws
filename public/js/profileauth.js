const transfer_input = document.getElementsByClassName("test")
const transfer = document.getElementById("transfer")

async function submit_transfer(){
    var data = new FormData()

    for (let i in transfer_input){
        data.append(transfer_input[i].name, transfer_input[i].value)
    }
    var request = await fetch("transfer",{
        method: "post",
        body: data
    })
    var response = await request.text()
    console.log(response)
}

transfer.addEventListener("click", submit_transfer)