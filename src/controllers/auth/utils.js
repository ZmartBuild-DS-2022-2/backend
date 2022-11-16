import jsonwebtoken from "jsonwebtoken"
import { JWT_SECRET } from "../../config/config.js"

export const sendAccessToken = (user, res) => {
  const tokenContent = { id: user.id, email: user.email }
  const resContent = {
    id: user.id,
    email: user.email,
    fullname: user.fullname,
    imgUrl: user.imgUrl,
  }

  const token = jsonwebtoken.sign(tokenContent, JWT_SECRET, { expiresIn: "3d" })
  return res
    .status(200)
    .cookie("access_token", token, { httpOnly: true, secure: false })
    .json(resContent)
}
