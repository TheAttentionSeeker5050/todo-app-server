const jwt = require('jsonwebtoken');

function generateAccessToken(email) {
    return jwt.sign(email, process.env.JWT_PASSWORD, { expiresIn: '1800s' });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['Authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_PASSWORD, (err, user) => {
    // console.log(err)

    if (err) {
      return res.sendStatus(403)
    }

    req.user = user

    next()
  })
}

module.exports = {generateAccessToken, authenticateToken}