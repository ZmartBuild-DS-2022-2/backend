import { Subproject, Project, ProjectPermission } from "../../config/db.js"

const verifyWriteProjectPermmission = async (req, res, next) => {
  const { currentUser } = req
  const { projectId, subprojectId } = req.params

  let subproject
  try {
    if (subprojectId) {
      subproject = await Subproject.findByPk(subprojectId, {
        include: [
          {
            model: Project,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      })
    }

    const permission = await ProjectPermission.findOne({
      where: {
        userId: currentUser.id,
        projectId: projectId ? projectId : subproject.project.id,
        role: ["a", "w"],
      },
    })

    if (permission) {
      return next()
    }
    return res.sendStatus(401)
  } catch (err) {
    return res.sendStatus(401)
  }
}

export default verifyWriteProjectPermmission
