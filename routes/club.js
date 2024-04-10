const express = require("express");
const router = express.Router();
const userModel = require("../models/users");
const storyModel = require("../models/stories");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcryptjs = require("bcryptjs");

const {body, validationResult} = require("express-validator");

//authentication
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await userModel.findOne({username: username});
            if(!user){
                return done(null, false, {message: "Incorrect username"});
            }
            const match = bcryptjs.compare(password, user.password);
            if(!match){
                return done(null, false, {message: "Incorrect password"});
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
)
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done)=>{
    try {
        const user = await userModel.findById(id);
        done(null, user);   
    } catch (error) {
        done(error);
    }
})

router.get("/", async (req, res, next)=>{
    const stories = await storyModel.find({}).populate("author").exec();
    res.render("index", {user: req.user, allStories: stories});
});
router.get("/register", (req, res, next)=>{
    res.render("register-form");
});
router.post(
    "/register", 
    body("cpassword").custom((value, {req}) => {
        return value===req.body.password;
    }), 
    async (req, res, next) => {
    bcryptjs.hash(req.body.password, 10, async (error, hashedPassword) => {
        if(error) next(error);
        await userModel.create({
            fname: req.body.fname,
            lname: req.body.lname,
            username: req.body.username,
            password: hashedPassword
        });
    });
    res.redirect("/login");
});
router.get("/login", (req, res, next)=>{
    res.render("login-form");
});
router.post("/login", 
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    })
);
router.get("/logout",  (req, res, next)=>{
    req.logout( error =>{
        if(error) return next(error);
        res.redirect("/");
    })
});
router.get("/createStory", (req, res, next) => {
    res.render("create-story", {user: req.user});
});
router.post("/createStory", async (req, res, next)=>{
    try {
        await storyModel.create({
            title: req.body.title,
            content: req.body.content,
            author: req.user
        });
        res.redirect("/");
    } catch (error) {
        return next(error);
    }
});
router.get("/deleteStory/:id", async (req, res, next)=>{
    const story = await storyModel.findById(req.params.id)
                        .populate("author")
                        .exec();
    res.render("delete-story", {story : story, user: req.user});
});
router.post("/deleteStory/:id", async (req, res, next)=>{
    try {
        await storyModel.findByIdAndDelete(req.params.id);
        res.redirect("/");
    } catch (error) {
        return next(error);
    }
});
router.get("/joinClub", (req, res, next) => {
    res.render("join-club", {user: req.user});
});
router.post("/joinClub", async (req, res, next) => {
    try {
        if(req.body.scode===process.env.SCODE){
            await userModel.findByIdAndUpdate(req.user.id, {isMember: true});
        }else{
            throw new Error("wrong code");
        }
    } catch (error) {
        return next(error);
    }
})

module.exports = router;