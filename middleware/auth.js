const jwt = require("jsonwebtoken");
const users = require("../models/users");
const Admin = require('../models/admin')


exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check JWT exists & is verified

    if (token) {
        jwt.verify(token, "user secret key", async (error, decodedToken) => {
            if (error) {
                console.log(error.message);
                res.redirect("/login");
            } else {
                next();
            }
        });
    } else {
        res.redirect("/login");
    }
};
exports.requireAdminAuth = (req, res, next) => {
    const token = req.cookies.adminJWT;

    // check JWT exists & is verified

    if (token) {
        jwt.verify(token, "admin secret key", async (error, decodedToken) => {
            if (error) {
                console.log(error.message);
                res.locals.user = null;
                res.redirect("/adminLogin");
            } else {
                const admin =await  Admin.findById(decodedToken.id)
                console.log('Admin Logged => ',admin.username.bold,admin.email.yellow.bold);
                res.locals.user = admin;
                
                next(); 
            }
        });
    } else {
        res.locals.user = null;
        res.redirect("/adminLogin");
        
    }
};



// check current user
exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt ;

    if (token) {
        jwt.verify(token, "user secret key", async (error, decodeToken) => {
            if (error) {
                console.log(error.message);
                res.locals.user = null;
                next();
            } else {
                const user =await  users.findById(decodeToken.id)
                console.log('current user = ',user.username.bold,user.email.yellow.bold);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next()
        
    }
};
