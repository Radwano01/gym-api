const express = require("express");
const app = express();

require("dotenv").config()

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({extended: false}))

const authRoute = require("./routes/auth.js").router;
const productRoute = require("./routes/products.js").router;

const PORT = process.env.PORT || 5002

app.listen(PORT, () => {
  console.log("server connected at:", PORT);
});

const cors = require("cors")
app.use(cors())
app.use(express.urlencoded({extended:false}))

const { static } = require('express');
app.use("/images/", static('../client/src/assets/products/'))

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
