const express = require("express");
const router = express.Router();

const {
    renderLogin,
    renderSignup,
    postSignup,
} = require("../controllers/controller");

router.get("/", renderLogin);
router.get("/signup", renderSignup);
router.post("/signup", postSignup);




module.exports = router