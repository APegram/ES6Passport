import validator from "validator";

const authController = {

    validateRegistration: function(userInfo) {
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
    },
    
    validateLogin: function(userInfo) {
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

}






export default authController;