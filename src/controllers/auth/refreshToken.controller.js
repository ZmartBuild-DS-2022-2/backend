import jsonwebtoken from "jsonwebtoken"
import { JWT_SECRET } from "../../config/config.js"

const refreshTokenController = async (req, res) => {
  const currentUser = req.currentUser
  const content = { id: currentUser.id, email: currentUser.email }
  const token = jsonwebtoken.sign(content, JWT_SECRET, { expiresIn: "3d" })
  return res
    .status(200)
    .cookie("access_token", token, { httpOnly: true, secure: false })
    .json({ id: currentUser.id, email: currentUser.email, fullname: currentUser.fullname })
}

export default refreshTokenController
