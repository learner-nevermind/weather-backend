const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");

router.post("/signin", auth.signIn);
router.post("/signup", auth.signUp);

module.exports = router;
