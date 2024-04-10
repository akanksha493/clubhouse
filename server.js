require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcryptjs = require("bcryptjs");

const clubRouter = require("./routes/club");
const userModel = require("./models/users");

const app = express();

//middleware
app.set("views",path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"/public")))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60*24 //a day
    },
    rolling: true
}));
app.use(passport.session());


//routes
// app.get("/", (req, res, next)=>{
//     res.render("index");
// });
app.use("/", clubRouter);


const port = process.env.PORT || 3000;
const main = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(port, console.log("Server is listening on port ", port));
    } catch (error) {
        console.log(error);
    }
}
main();