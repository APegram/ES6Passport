import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import config from "../../config";

const User = mongoose.model("User");

const AuthCheck = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    //Use end of header string "token-value"
    const token = req.headers.authorization.split(" ")[1];

    //decode token using the secret key-phrase
    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) { return res.status(401).end() }

        const userId = decoded.sub;

        //Checking if user exist
        return User.findById(userId, (userErr, user) => {
            if (userErr || !user) { return res.status(401).end() }
            
            req.user = user;
            return next();
        });
    });
};

export default AuthCheck;