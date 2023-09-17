import express from "express";
import cors from "cors";
import mysql from "mysql";

const app = express();

app.use(express.json);
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "shop",
});

app.listen(3001, ()=>{
    console.log("YE")
});