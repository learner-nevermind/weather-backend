const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(routes);

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Connected!"));

app.listen(process.env.SERVER_PORT, () => {
  console.log(`The server started on ${process.env.SERVER_PORT}`);
});
