import { Project, Subproject, ProjectPermission } from "../../config/db.js"

const verifyAdminProjectPermmission = async (req, res, next) => {
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
        role: "a",
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

export default verifyAdminProjectPermmission
