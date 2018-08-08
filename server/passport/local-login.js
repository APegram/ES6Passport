import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {Strategy as LocalStrategy} from "passport-local";
import config from "../../config";

const User = mongoose.model("User");

const LocalLogin = new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password.trim()
    };

    return User.findOne({ email: userData.email}, (err, user) => {
        if (err) { return done(err) }

        if (!user) {
            const error = new Error("Invalid email or password");
            error.name = "InvalidCredentialsError";
            return done(error);
        }

        return user.comparePassword(userData.password, (passwordErr, isMatch) => {
            if (err) { return done(err) }

            if (!isMatch) {
                const err = new Error("Invalid email or password");
                error.name = "InvalidCredentialsError";
                return done(error);
            }

            const payload = {
                sub: user._id
            };

            //Create Token
            const token = jwt.sign(payload, config.jwtSecret);
            const data = {
                name: user.name
            };

            return done(null, token, data);
        });
    });
});

export default LocalLogin;