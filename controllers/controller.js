const users = require("../models/users");
exports.renderLogin = (req, res) => {
    res.render("login");
};

exports.allData = async (req, res) => {
    const alldata = await users.find();
    console.log("all data    = ", alldata);
    res.render("login");
};

exports.renderSignup = (req, res) => {
    res.render("signup");
};

exports.postSignup = async (req, res) => {
    const data = {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        password: req.body.password,
    };
    const user = new users(data);
    try {
        const addUser = await user.save();
        if(addUser){

            res.status(200).render("login", { signupMessage: "Signup successful! You can now log in." });
        }
    } catch (error) {
        response.status(500).send(error);
    }
    console.log("user = ", user);
};

exports.postLogin = async (req, res) => {
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    };
    try {
        const userExist = await users.findOne(data).exec()
        if(userExist) {
            console.log('userExist   = ',userExist);
            res.status(200).send('Home')
        }else{
           res.render("signup", { signupMessage: "User Not Exist Please SignUp" });
        }
        
    } catch (error) {
        res.status(500).send(error)
    }
};
