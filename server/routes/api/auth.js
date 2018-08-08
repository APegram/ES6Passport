import validator from "validator";
import passport from "passport";
import express from "express";

const router = express.Router();

function validateRegistration(userInfo) {
    const errors = {};
    let isFormValid = true;
    let message = "";

    if (!userInfo || typeof userInfo.email !== "string" || !validator.isEmail(userInfo.email)) {
        ifFormValid = false;
        errors.email = "Please provide a valid email address.";
    }

    if (!userInfo || typeof userInfo.password !== "string" || userInfo.password.trim().length < 6) {
        isFormValid = false;
        errors.password = "Password must be at least 6 characters.";
    }

    if (!userInfo || typeof userInfo.firstName !== "string" || userInfo.firstName.trim().length === 0){
        isFormValid = false;
        errors.firstName = "Please provide your first name"
    }

    if (!userInfo || typeof userInfo.lastName !== "string" || userInfo.lastName.trim().length === 0){
        isFormValid = false;
        errors.lastName = "Please provide your last name"
    }

    if (!isFormValid) {
        message = "Please correct errors on the form."
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

function validateLogin (userInfo) {
    const errors = {};
    let isFormValid = true;
    let message = "";

    if (!userInfo || typeof userInfo.email !== "string" || !validator.isEmail(userInfo.email)) {
        ifFormValid = false;
        errors.email = "Please provide your email address.";
    }

    if (!userInfo || typeof userInfo.password !== "string" || userInfo.password.trim().length < 6) {
        ifFormValid = false;
        errors.password = "Please provide a valid password";
    }

    if (!isFormValid) {
        message = "Please correct errors on the form."
    }
    
    return {
        success: isFormValid,
        message,
        errors
    };
}

router.post("/signup", (req, res, next) => {
  const validationResult = validateRegistration(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      succes: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return passport.authenticate("local-signup", err => {
    if (err) {
      if (err.name === "BulkWriteError" && err.code === 11000) {
        //11000 Mongo Code Means Duplication of Email
        return res.status(409).json({
          success: false,
          message: "Correct errors on form.",
          errors: {
            email: "Email is in use"
          }
        });
      }

      return res.status(400).send({
        success: false,
        message: "Unable to process form at this time."
      });
    }

    return res.status(200).json({
      success: true,
      message: "You have been registered. Please log in."
    });
  })(req, res, next);
});

router.post("/login", (req, res, next) => {
    const validationResult = validateLogin(req.body);
    if (!validationResult.success){
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    return passport.authenticate("local-login", (err, token, userData) => {
        if(err) {
            if (err.name === "InvalidCredentialsError"){
                return res.status(400).json({
                    succes: false,
                    message: err.message
                });
            }

            return res.status(400).json({
                success: false,
                message: "Unable to process the form at this time."
            });
        }

        return res.json({
            success: true,
            message: "You are now logged in.",
            token,
            user: userData
        });
    })(req, res, next);
});

export default router;