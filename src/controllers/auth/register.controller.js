import { User } from "../../config/db.js"

const registerController = async (req, res) => {
  const { email, fullname, password } = req.body
  if (!email || !fullname || !password) {
    return res.status(400).send("You must complete all fields")
  }

  const user = User.build(req.body)
  try {
    const newUser = await user.save({ fields: ["email", "fullname", "password"] })
    return res
      .status(201)
      .json({ id: newUser.id, email: newUser.email, fullname: newUser.fullname })
  } catch (err) {
    return res.status(400).json(err)
  }
}

export default registerController
