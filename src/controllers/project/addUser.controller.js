import { Project, User } from "../../config/db.js"

const addUserController = async (req, res) => {
  const { userId, role } = req.body
  if (!userId || !role) {
    return res.status(400).send("You must complete all required fields")
  }

  const permittedRoles = ["a", "w", "r"]
  if (!permittedRoles.includes(role)) {
    return res.status(400).send("Role type is not valid")
  }

  const userToAdd = await User.findByPk(userId)
  const project = await Project.findByPk(req.params.projectId)

  try {
    await userToAdd.addProject(project, { through: { role: role } })
    return res.sendStatus(200)
  } catch (err) {
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send(err.message)
    }
  }
}

export default addUserController
