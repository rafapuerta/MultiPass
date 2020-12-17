const express = require("express")
const MongoClient = require("mongodb").MongoClient
const app = express ()

let user = require("./user")
let entradas = require("./entradas")

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use("/user", user)
app.use("/entradas", entradas)


MongoClient.connect("mongodb+srv://rafa:6of4snMMtcW1p2YJ@cluster0.31n0c.mongodb.net/festival?retryWrites=true&w=majority", function( error, client){
    if (error !== null) {
        console.log(error);
      } else {
        app.locals.db = client.db("festival");
      }
})

app.listen(3000)