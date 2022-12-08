import { OrganizationPermission, ProjectPermission } from "../config/db.js"

const verifyInvitationPermission = async (req, res, next) => {
  const { currentUser } = req
  const { type, objectiveId } = req.body

  try {
    let permission
    if (type == "organization") {
      permission = await OrganizationPermission.findOne({
        where: { userId: currentUser.id, organizationId: objectiveId, role: "a" },
      })
    } else if (type == "project") {
      permission = await ProjectPermission.findOne({
        where: { userId: currentUser.id, projectId: objectiveId, role: "a" },
      })
    }

    if (permission) {
      return next()
    }
    return res.sendStatus(401)
  } catch (err) {
    return res.sendStatus(401)
  }
}

export default verifyInvitationPermission
