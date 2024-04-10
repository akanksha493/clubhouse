const userModel = require("../models/users");

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

const createUser = (req, res, next) =>{

}