const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");

//Importing all the main routes
const homeRoute = require("./Routes/homeRoute");
const apiRoute = require("./Routes/API");

//Middlewares
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("Connected to the Database")
);
mongoose.set("useCreateIndex", true);

//Handling the Routes
app.use("/", homeRoute);
app.use("/api", apiRoute);

//Specifying the port number to run the API service on
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is up and running on ${port}`));
