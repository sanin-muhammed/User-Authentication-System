const mongoose = require("mongoose");


const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please enter a name"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "please enter an email"],
    },
    password: {
        type: String,
        required: [true, "please enter an password"],
        minLength: [6, "Minimum password length is 6 characters"],
    },
});

const Admin = mongoose.model("admins", adminSchema);
// export Admin collection
module.exports = Admin;
