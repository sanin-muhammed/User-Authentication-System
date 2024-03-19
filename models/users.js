const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please enter a name"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "please enter an email"],
        // validate:[isEmail,'please enter a valid email']
    },
    phone: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female"], // Enumerated values for gender
        required: true,
    },
    password: {
        type: String,
        required: [true, "please enter an password"],
        minLength: [6, "Minimum password length is 6 characters"],
    },
    active: {
        type: Boolean,
        default: true,
    },
});
// fire a function after doc saved to db
userSchema.post("save", function (doc, next) {
    console.log("new user was created & saved", doc);

    next();
});

// fire a function after doc saved to db
userSchema.pre("save", async function (next) {
    console.log("user about to be created & saved", this);
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static method to login user
userSchema.statics.login = async function (username, email, password) {
    const active = true;
    const user = await this.findOne({ email, active });
    if (user) {
        const usernameAuth = (await username) === user.username;
        const passwordAuth = await bcrypt.compare(password, user.password);
        // const activeAuth = await user.active === true;

        // if (!activeAuth)throw Error("incorrect email");
        if (!usernameAuth) throw Error("incorrect username");
        if (!passwordAuth) throw Error("incorrect password");
        if (usernameAuth && passwordAuth) return user;
    }
    throw Error("incorrect email");
};

const users = mongoose.model("users", userSchema);
// export users collection
module.exports = users;
