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

app.post("/login", (req, res)=>{
    const password = req.body.password;
    const username = req.body.username;
    const checkUser = "SELECT * FROM Users WHERE Name=?;"
    const login = "SELECT * FROM Users WHERE Name=? AND Password=?;"
    let exist = false;
    db.query(checkUser, [username], (error, data) =>{
        if(error) {
            return res.send(error);
        }
        if (data.length == 0) {
            return res.send({message: "User does not exist."});
        }
        exist = true;
    })
    if(exist) {
        db.query(login, [username, password], (error, data) =>{
            if(error) {
                return res.send(error);
            }
            if (data.length == 0) {
                return res.send({message: "Wrong password."})
            }
            return res.send(data)
        })
    }


})

app.listen(3001, ()=>{
    console.log("HELLO WORLD");

});