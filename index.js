const cors = require("cors");
const mysql = require("mysql");
const express = require("express");
const session = require("express-session")
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}));

app.use(session({
    key: "userID",
    secret: "secret",
    resave: "false",
    saveUninitialized: false,
    cookie: {
        expires: 60*60*24,
    }
}))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "shop",
});

app.get("/login", (req, res)=>{
    if(req.session.user) 
        res.send({loggedIn: true, user: req.session.user});
    else
        res.send({loggedIn: false});
})

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
        req.session.user = data;
        return res.json(data);
    })
})

app.post("/logout", (req, res)=> {
    req.session.destroy();
    console.log("WORK");
    return res.send("YAY");
})

app.get("/product/:id",(req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM Products WHERE ProductID=?;";
    db.query(query, id, (err, data) => {
        if (err)
            return res.send(err);
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

app.get("/cart", (req, res) => {
    const id = req.query.id
    query = "SELECT Products.ProductID, Orders.OrderID, Orders.Quantity, Products.Image, Products.Name, Products.Price FROM Products RIGHT JOIN Orders ON Products.ProductID = Orders.ProductID WHERE Orders.BuyerID=?;"
    db.query(query, [id], (err, data) => {
        if (err)
            return res.send(err);
        return res.json(data);
    })
})

app.post("/cart", (req, res) => {
    const id = req.body.profile.UserID;
    let hasOrder = false;
    const check = "SELECT * FROM Orders WHERE BuyerID = ?;";
    db.query(check, [id], (err, data) => {
        if (err) {
            return res.send(err);
        }
        if (data.length !== 0) {
            hasOrder = true;
            return res.send({hasOrder: hasOrder});
        }
    })
    if (!hasOrder) {
        const pId = req.body.product.ProductID;
        const q = req.body.quantity;
        const query = "INSERT INTO Orders (BuyerID, ProductID, Quantity) VALUES (?, ?, ?);"
        db.query( query, [id, pId, q], (err, data)=> {
            if (err) {
                return res.send(err);
            }
            return res.json(data);
        })
    }
})

app.get("/sell", (req, res) => {

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
});