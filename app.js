const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const coonectDB = require("./config/database");
const connectDB = require("./config/database");
const ejs = require("ejs");

const PORT = process.env.PORT || 3001;
const app = express();

// connected MongoDB
connectDB();

// use ejs as a view engine
app.set("view engine", "ejs");
// static file
app.use(express.static("public"));

const routes = require("./routes/index");

app.use(cors());
app.use(bodyParser.json());

app.use("/", routes);












app.listen(PORT, console.log("server running on PORT ", PORT));
