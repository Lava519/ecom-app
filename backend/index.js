const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes)

app.listen(3000, () =>{
  console.log("SERVER IS RUNNING");
})
