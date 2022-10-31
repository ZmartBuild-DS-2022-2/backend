import jsonwebtoken from "jsonwebtoken"
import { JWT_SECRET } from "../config/config.js"

const verifyToken = (req, res, next) => {
  const { access_token } = req.cookies
  if (access_token === undefined) {
    return res.sendStatus(401)
  }

  try {
    const decoded = jsonwebtoken.verify(access_token, JWT_SECRET)
    // eslint-disable-next-line no-console
    console.log(decoded)
  } catch (err) {
    return res.sendStatus(401)
  }

  return next()
}

export default verifyToken
