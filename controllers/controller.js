const users = require("../models/users");
exports.renderLogin = (req, res) => {
    res.render("login");
};

exports.renderSignup = (req, res) => {
    res.render("signup");
};
exports.postSignup = async (req, res) => {
    console.log('reqbody  =',req.body);
    const data = {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        password: req.body.password,
    };
    // const user = await users.find();
    // console.log("user = ", user);
    console.log(data);

    res.render("login", { signupMessage: "Signup successful! You can now log in." });
};
