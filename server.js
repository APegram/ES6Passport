import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import config from "./config";
import db from "./server/models/index";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
}

//Connect to Mongo DB and load models (Reference index.js in Models to see connection);
db.connect(config.dbUri);

//Setting up passport middleware
app.use(passport.initialize());

//load passport 'local' strategy
import localSignupStrategy from "./server/passport/local-signup";
import localLoginStrategy from "./server/passport/local-login";
passport.use("local-signup", localSignupStrategy);
passport.use("local-login", localLoginStrategy);

//adding authentication middleware and wrap api routes in authentication
import isAuth from "./server/middleware/auth-check";
app.use("/api", isAuth);

//Adding routes
import authRoutes from "./server/routes/api/auth";
import apiRoutes from "./server/routes/api/index";
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

app.get("*", (req, res) => { res.sendFile(path.join(__dirname, "./client/build/index.html")) });

app.listen(PORT, () => { console.log(` ==> Server now on port ${PORT}!`) });