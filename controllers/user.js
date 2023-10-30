const bcrypt = require("bcryptjs")
const User = require("../models/User")
const { generateAccessToken } = require("../middlewares/auth")

const user = {
  profile: async (req, res) => {
    try {
      const { userId, username } = req.user
      const { username: newUsername, latitude, longitude } = req.body

      if (username !== newUsername) {
        const user = await User.findOne({ username: newUsername })
        if (user)
          return res.json({
            success: false,
            message: "username is unavailable",
          })
      }
      const user = await User.findByIdAndUpdate(userId, {
        location: { lat: latitude, long: longitude },
      })

      return res.json({
        success: true,
        userInfo: { username: user.username, location: user.location },
      })
    } catch (error) {
      res.json({ success: false, message: error.message })
    }
  },

  password: async (req, res) => {
    const userId = req.user.userId
    const { currentPassword, newPassword } = req.body

    User.findById(userId)
      .then((user) => {
        bcrypt.compare(currentPassword, user.password, function (err, isEqual) {
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

          user.password = newPassword
          user
            .save()
            .then(() => {
              return res.json({
                success: true,
                message: "Updated successfully",
              })
            })
            .catch((err) => {
              res.json({
                success: false,
                message: err.message,
              })
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

module.exports = user
