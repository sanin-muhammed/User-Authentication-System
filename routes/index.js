const express = require("express");
const router = express.Router();

const {
    renderLogin,
    allData,
    renderSignup,
    postSignup,
    postLogin,
} = require("../controllers/controller");

router.get("/", renderLogin);
router.get("/alldata", allData);
router.get("/signup", renderSignup);
router.post("/signup", postSignup);
router.post("/login", postLogin);




module.exports = router