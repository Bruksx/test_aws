const express = require("express")
const app = express()
const body_parser = require("body-parser")
const multer = require("multer")
const upload = multer()

//set view engine
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(body_parser.json())
app.use(upload.array())
app.use(body_parser.urlencoded({extended:true}))

app.get("/", function(req, res){
    res.render("index")
})

app.get("/profile", function(req, res){
    res.render("profile")
})

app.listen(3000)