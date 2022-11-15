import { Project, User } from "../../config/db.js"

const verifyReadProjectPermmission = async (req, res, next) => {
  const id = req.params.projectId

  const userProjects = await User.findByPk(req.currentUser.id, {
    include: [
      {
        model: Project,
        as: "projects",
        attributes: ["id"],
        through: { attributes: [] },
      },
    ],
  })

  let permission = false
  userProjects.projects.forEach((item) => {
    permission = permission || id == item.id
  })

  if (permission) {
    return next()
  }
  return res.sendStatus(404)
}

export default verifyReadProjectPermmission
