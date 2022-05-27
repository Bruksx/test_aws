const express = require("express")
const app = express()
const body_parser = require("body-parser")
const multer = require("multer")
const upload = multer()
const mongoose = require("mongoose")
var session = require('express-session')
const MongoStore = require("connect-mongo")

mongoose.connect('mongodb://localhost/my_db')

//set view engine
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(body_parser.json())
app.use(upload.array())
app.use(body_parser.urlencoded({extended:true}))
app.use(session({
    secret: 'Shh, its a secret! cvxhsksofiss',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/my_db',
        ttl: 14 * 24 * 60 * 60,
        autoRemove: 'native' 
    })
}))


var userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {type:String, unique:true},
    username: {type:String, unique:true},
    password: String,
    balance: Number
})

var user = mongoose.model("user", userSchema)

var transferSchema = mongoose.Schema({
    amount: Number,
    sender: String,
    receiver: String,
    timestamp: {type: Date, default: Date.now}
})

var transferObj = mongoose.model("transfer", transferSchema)


app.get("/", function(req, res){
    res.render("index")
})

app.get("/profile", async function(req, res){
    if (req.session.user){
        var data = await user.findOne({email: req.session.user.email})
        var sent_transfers = await transferObj.find({sender:data.email})
        var received_transfers = await transferObj.find({receiver:data.email})
        var all_transfers = sent_transfers.concat(received_transfers)
        console.log(all_transfers)
        res.render("profile", {data:data, all_transfers:all_transfers})
    }
    else{
        res.send("You must login")
    }

})

app.post("/register", function(req, res){
    var data = req.body

    var empty_fields = []
    for (let i in data){
        if (data[i] === ""){
            empty_fields.push(i)
        }
    }

    if (empty_fields.length > 0){
        res.send(`The following fields are required ${empty_fields.join()}`)
    }

    if (data["password"] != data["password2"]){
        res.send("password doesnt match")
    }

    if (data["password"].length < 6){
        res.send("Password too short, must be 6 or more characters")
    }

    else{
        var new_user = new user({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            username: data.username,
            password: data.password,
            balance: 100000
        })
        new_user.save()
        res.send("registration, successfull")
    }
})

app.post("/login", async function(req, res){
    var data = req.body
    var user_exists = await user.findOne({email: data.email})
    if (user_exists === null){
        res.send("this email is not registered")
    }
    else{
        if (user_exists.password === data.password){
            req.session.user = user_exists
            req.session.save()
            res.send("password correct")
        }
        else{
            res.send("incorrect password")
        }
    }
})

app.get("/test", function(req, res){
    if (req.session.count){
        req.session.count += 1
        res.send(req.session.count.toString())
        req.session.save()
    }
    else{
        req.session.count = 1
        res.send(req.session.count.toString())
        req.session.save()
    }
})

app.post("/transfer", async function(req, res){
    var form = req.body
    var sender = await user.findOne({email: req.session.user.email})
    var receiver = await user.findOne({email: form.email})
    if (receiver){
        if (form.amount <= sender.balance){
            if (form.password === sender.password){
                await user.findOneAndUpdate({email:form.email}, {balance: receiver.balance + Number(form.amount)})
                await user.findOneAndUpdate({email:sender.email}, {balance: sender.balance - Number(form.amount)})
                var new_transfer = new transferObj({
                    sender: sender.email,
                    receiver: receiver.email,
                    amount: form.amount
                })
                new_transfer.save()
                res.send("transfer successful")
            }
            else{
                res.send("incorrect pin")
            }
        }
        else{
            res.send("not enough balance")
        }
    }
    else{
        res.send("this user doesnt exist")
    }
})
const port = process.env.port || 3000
app.listen(port)