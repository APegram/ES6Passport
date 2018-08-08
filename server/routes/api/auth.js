import passport from "passport";
import express from "express";
import authController from "../../controllers/authController";

const router = express.Router();

router.post("/signup", (req, res, next) => {
  const validationResult = authController.validateRegistration(req.body);
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
    const validationResult = authController.validateLogin(req.body);
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