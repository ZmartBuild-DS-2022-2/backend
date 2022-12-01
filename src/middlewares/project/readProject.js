import { Project, User } from "../../config/db.js"

const verifyReadProjectPermission = async (req, res, next) => {
  const { projectId } = req.params
  try {
    const userProjects = await User.findByPk(req.currentUser.id, {
      include: [
        {
          model: Project,
          as: "userProjects",
          where: { id: projectId },
        },
      ],
    })

    if (userProjects) {
      return next()
    }
    return res.sendStatus(401)
  } catch (err) {
    console.log(err)
    return res.sendStatus(404)
  }
}

export default verifyReadProjectPermission
