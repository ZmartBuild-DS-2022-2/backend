import { ProjectPermission } from "../../config/db.js"

const verifyReadProjectPermission = async (req, res, next) => {
  const { currentUser } = req
  const { projectId } = req.params

  try {
    const permission = await ProjectPermission.findOne({
      where: { userId: currentUser.id, projectId: projectId },
    })

    if (permission) {
      return next()
    }
    res.sendStatus(404)
  } catch (err) {
    return res.sendStatus(404)
  }
}

export default verifyReadProjectPermission
