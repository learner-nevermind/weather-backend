const bcrypt = require("bcryptjs")
const User = require("../models/User")
const { generateAccessToken } = require("../middlewares/auth")

const auth = {
  signIn: (req, res) => {
    const { username, password } = req.body

    User.findOne({ username: username })
      .then((user) => {
        if (!user)
          return res.json({
            success: false,
            message: "User not found",
          })
        bcrypt.compare(password, user.password, function (err, isEqual) {
          if (err)
            return res.json({
              success: false,
              message: err.message,
            })
          if (!isEqual)
            return res.json({
              success: false,
              message: "Invalid password",
            })

          const token = generateAccessToken({ userId: user._id, username })

          return res.json({
            success: true,
            token,
            userInfo: { username: user.username, location: user.location },
            message: "Signined successfully",
          })
        })
      })
      .catch((err) => {
        res.json({
          success: false,
          message: err.message,
        })
      })
  },

  signUp: (req, res) => {
    const { username, password, latitude, longitude } = req.body

    User.findOne({ username })
      .then((user) => {
        if (user)
          return res.json({
            success: false,
            message: "username is unavailable",
          })

        const newUser = new User({
          username,
          password,
          location: {
            lat: latitude,
            long: longitude,
          },
        })

        newUser
          .save()
          .then(() => {
            res.json({
              success: true,
              message: "User registered successfully",
            })
          })
          .catch((err) => {
            res.json({
              success: false,
              message: err.message,
            })
          })
      })
      .catch((err) => {
        res.json({
          success: false,
          message: err.message,
        })
      })
  },
}

module.exports = auth
