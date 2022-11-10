import jsonwebtoken from "jsonwebtoken"
import { JWT_SECRET } from "../config/config.js"
import { User } from "../config/db.js"

const verifyToken = async (req, res, next) => {
  const { access_token } = req.cookies
  if (access_token === undefined) {
    return res.sendStatus(401)
  }

  try {
    const { id, email } = jsonwebtoken.verify(access_token, JWT_SECRET)
    const currentUser = await User.findOne({ where: { id, email } })
    if (!currentUser) {
      return res.sendStatus(401)
    }
    req.currentUser = currentUser
    return next()
  } catch (err) {
    return res.clearCookie("access_token").sendStatus(401)
  }
}

export default verifyToken
