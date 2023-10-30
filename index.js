const express = require("express");
const app = express();
// const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
// const routes = require("./routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// app.use(routes);

// require("dotenv").config();

// mongoose.connect('mongodb+srv://nevermind0825:mongo!2023@cluster0.qcymeag.mongodb.net/').then(() => console.log("Connected!"));

// app.listen(process.env.SERVER_PORT, () => {
//   console.log(`The server started on ${process.env.SERVER_PORT}`);
// });

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `);
});

app.get("/", (req, res) => {
  res.send(`Hey this is my API running 🥳, ${process.env.MONGODB_URI}`);
});

app.get("/about", (req, res) => {
  res.send("This is my about route..... ");
});

// Export the Express API
module.exports = app;
