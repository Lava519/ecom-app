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
    const query = "SELECT * FROM Users WHERE Name=? AND Password=?;"
    db.query(query, [username, password], (error, data) =>{
        if(error) {
            return res.send(error);
        }
        if (data.length == 0) {
            return res.send({message: "Wrong username and password combination."});
        }
        return res.json(data);
    })
})

app.get("/products", (req, res) => {
    query = "SELECT * FROM Products;";
    db.query(query, (err, data) => {
        if (err)
            return res.send(err);
        return res.json(data);
    })
})

app.post("/register", (req, res)=> {
    const username = req.body.username;
    const password = req.body.password
    const checkUser = "SELECT * FROM Users WHERE Name=?;"
    const query = 'INSERT INTO Users (Name, Password, Avatar, Role) VALUES (?, ?, 0, "Buyer")'
    db.query(checkUser, [username], (checkErr, checkData) => {
        if(checkErr)
            return res.send(checkErr);
        if(checkData.length == 0)
            db.query(query, [username, password], (err, data) => {
                if(err)
                    return res.send(err);
                return res.send(data);
            }) 
    })
})

app.listen(3001, ()=>{
    console.log("HELLO WORLD");

});