const express = require("express")
const router = express.Router()
const authRouter = require("./auth")
const userRouter = require("./user")
const { authenticateToken } = require("../middlewares/auth")

router.use("/api/auth", authRouter)
router.use("/api/user", authenticateToken, userRouter)

module.exports = router
