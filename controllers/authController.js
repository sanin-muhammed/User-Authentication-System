const users = require("../models/users");
const Admin = require("../models/admin");
const Products = require("../models/products");
const jwt = require("jsonwebtoken");

const handleErrors = (error) => {
    // handle errors
    console.log(`handle errors  => ${error.message}`.magenta, error.code);
    let errors = { username: "", email: "", password: "" };

    // incorrect email
    if (error.message === "incorrect username") {
        errors.username = "that username is incorrect";
    }
    if (error.message === "incorrect email") {
        errors.email = "that email is not registered";
    }
    if (error.message === "incorrect password") {
        errors.password = "that password is incorrect";
    }

    // duplicate error code
    if (error.code === 11000) {
        errors.email = "that email is already registered";
        return errors;
    }

    // validation errorsx
    if (error.message.includes("users validation failed")) {
        Object.values(error.errors).forEach(({ properties }) => {
            console.log("properties = ", properties);
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

// create a user token function
const maxAge = 3 * 24 * 60 * 60;
const createUserToken = (id) => {
    return jwt.sign({ id }, "user secret key", {
        expiresIn: maxAge,
    });
};
// create a Admin token function
const createAdminToken = (id) => {
    return jwt.sign({ id }, "admin secret key", {
        expiresIn: maxAge,
    });
};

exports.renderLogin = (req, res) => {
    res.render("login");
};

exports.renderSignup = (req, res) => {
    res.render("signup");
};

exports.postSignup = async (req, res) => {
    const { username, email, phone, gender, password } = req.body;

    try {
        const newUser = await users.create({ username, email, phone, gender, password });

        res.status(201,{newUser}).json({ user: newUser._id });
    } catch (error) {
        console.log(`catch error => ${error} `.magenta);
        const errors = handleErrors(error);
        console.log("errrr   = ", errors);
        res.status(400).json({ errors });
    }
};

exports.postLogin = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await users.login(username, email, password);
        const token = createUserToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
};

// admin login

exports.adminLogin_post = async (req, res) => {
    const { username, email, password } = req.body;
    console.log({ username, email, password });
    try {
        const admin = await Admin.findOne({ username, email, password });
        console.log("admin =", admin);
        const token = createAdminToken(admin._id);
        res.cookie("adminJWT", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: admin._id });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
};

exports.logout_get = async (req, res) => {
    res.cookie("adminJWT", "", { maxAge: 1 });
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
};



// admin dashboard

exports.show_user_list = async (req, res) => {
    const userList = await users.find();
    console.log(userList);
    res.render("users_list", { userList });
};

exports.toggle_user_status = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await users.findById(id);
        console.log("user = ", user);
        if(user.active == true){
            const active = false
            const updatedUser = await users.findByIdAndUpdate(id,{active})
            console.log('updated user = ',updatedUser);
            
        }else{
            const active = true
            const updatedUser = await users.findByIdAndUpdate(id,{active})
            console.log('updated user = ',updatedUser);
        }
        res.redirect('/users_list')
        
    } catch (error) {
        console.log("toggle error", error);
    }
};
