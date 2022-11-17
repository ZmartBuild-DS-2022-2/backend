import { User } from "../../config/db.js"

const verifyWriteProjectPermmission = async (req, res, next) => {
  const id = req.params.projectId

  const userProjects = await User.findByPk(req.currentUser.id, { include: "projects" })

  const projects = []
  userProjects.projects.forEach((item) => {
    projects.push({
      id: item.id,
      role: item.projectPermission.role,
    })
  })

  let permission = false
  projects.forEach((item) => {
    if (id == item.id) {
      if (item.role == "a" || item.role == "w") {
        permission = true
      }
    }
  })

  if (permission) {
    return next()
  }
  return res.sendStatus(404)
}

export default verifyWriteProjectPermmission
