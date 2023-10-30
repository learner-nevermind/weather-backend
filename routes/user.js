const express = require("express")
const router = express.Router()
const user = require("../controllers/user")

router.post("/profile", user.profile)
router.post("/password", user.password)

module.exports = router
