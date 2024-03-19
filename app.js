const colors = require("colors");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3001;
const app = express();

// connected MongoDB
connectDB();

// use ejs as a view engine
app.set("view engine", "ejs");

// static file
app.use(express.static("public"));
app.use(express.static('uploads'));

const authRoutes = require("./routes/authRoutes");
const productsRoutes = require('./routes/productsRoutes');
// middlewares
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

app.use(cors());

// app.get("*", checkUser);
app.use(authRoutes);
app.use('/', productsRoutes);
app.listen(PORT, console.log(`server running on http://localhost:${PORT}`.yellow));
