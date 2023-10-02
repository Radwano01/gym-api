const express = require("express");
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({extended: false}))

const authRoute = require("./routes/auth.js").router;
const productRoute = require("./routes/products.js").router;

app.listen(5002, () => {
  console.log("server connected at 5002");
});

const cors = require("cors")
app.use(cors())
app.use(express.urlencoded({extended:false}))

const { static } = require('express');
app.use("/images/", static('../client/src/assets/products/'))

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);

console.log("hello world")