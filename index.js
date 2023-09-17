var cors = require("cors");
var mysql = require("mysql");
const express = require("express");
const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "shop",
});

app.get("/home", (req, res)=>{
    res.send("HELLO WORLD FROM BACKEND!");
})

app.listen(3001, ()=>{
    console.log("HELLO WORLD");

});