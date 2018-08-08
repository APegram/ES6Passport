import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    firstName: { type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

userSchema.methods.comparePassword = function comparePassword(password, callback){
    bcrypt.compare(password, this.password, callback);
};

userSchema.pre("save", function saveHook(next){
    const user = this;

    if (!user.isModified("password")) return next();

    return bcrypt.genSalt((saltError, salt) => {
        if (saltError) { return next(saltError); }

        return bcrypt.hash(user.password, salt, (hashError, hash) => {
            if (hashError) { return next(hashError); }

            user.password = hash

            return next();
        });
    });
});

const User = mongoose.model("User", userSchema);

export default User;