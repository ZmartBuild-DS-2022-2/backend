import { User } from "../../config/db.js"

const registerController = async (req, res) => {
  const { email, fullname, password } = req.body
  if (!email || !fullname || !password) {
    return res.status(400).send("You must complete all fields")
  }

  const user = User.build(req.body)
  try {
    await user.save({ fields: ["email", "fullname", "password"] })
    return res.sendStatus(201)
  } catch (err) {
    return res.status(400).send(err.errors[0]?.message)
  }
}

export default registerController
