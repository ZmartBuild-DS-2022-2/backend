import jsonwebtoken from "jsonwebtoken"
import { JWT_SECRET } from "../../config/config.js"
import { User } from "../../config/db.js"

const loginController = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ where: { email } })

  if (user && email === user.email && password === user.password) {
    const content = { id: user.id, email: user.email }
    const token = jsonwebtoken.sign(content, JWT_SECRET, { expiresIn: "3d" })
    return res.cookie("access_token", token, { httpOnly: true, secure: false }).sendStatus(200)
  }

  return res.status(401).send("Wrong email or password")
}

export default loginController
