const express = require("express");
const router = express.Router();

const {
    renderLogin,
    renderSignup,
    postSignup,
    postLogin,
    logout_get,
    adminLogin_post,
    show_user_list,
    show_products,
    toggle_user_status
} = require("../controllers/authController");
const { checkUser, requireAuth, requireAdminAuth } = require("../middleware/auth");


router.get('*',checkUser)
router.get("/", (req, res) => res.render("home"));
router.get("/dashboard",requireAdminAuth, (req, res) => res.render("dashboard"));


router.get("/signup", renderSignup);
router.post("/signup", postSignup);
router.get("/login", renderLogin);
router.post("/login", postLogin);
router.get("/logout", logout_get);

// admin side dashboard
router.get("/adminLogin", (req, res) => res.render("adminLogin"));
router.post("/adminLogin", adminLogin_post);
router.get('/users_list',requireAdminAuth,show_user_list)

// product 

router.post('/toggle_user_status/:id',toggle_user_status)

module.exports = router;
