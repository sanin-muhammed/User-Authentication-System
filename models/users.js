const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: Number,
    },
    gender: {
        type: String,
        enum: ["Male", "Female"], // Enumerated values for gender
    },
    password: {
        type: String,
    },
});

const users = mongoose.model("users", userSchema);
// export users collection
module.exports = users;
