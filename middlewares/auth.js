const jwt = require("jsonwebtoken")

function generateAccessToken(userInfo) {
  return jwt.sign(userInfo, process.env.TOKEN_SECRET, { expiresIn: "1800s" })
}

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    console.log({ user })

    req.user = user

    next()
  })
}

module.exports = {
  generateAccessToken,
  authenticateToken,
}
