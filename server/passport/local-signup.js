import mongoose from "mongoose";
import { Strategy as LocalStrategy } from "passport-local";

const User = mongoose.model("User");

const LocalSignup = new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password.trim(),
        firstName: req.body.firstName.trim(),
        lastName: req.body.lastName.trim()
    };

    const newUser = new User(userData);
    newUser.save((err) => {
        if (err) {
            return done(err);
        }
        return done(null);
    });
});

export default LocalSignup;