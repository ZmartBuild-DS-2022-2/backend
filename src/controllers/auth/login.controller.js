import { sendAccessToken } from "./utils.js"
import { User } from "../../config/db.js"

const loginController = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ where: { email } })

  if (user && email === user.email && password === user.password) {
    return sendAccessToken(user, res)
  }

  return res.status(401).send("Wrong email or password")
}

export default loginController
