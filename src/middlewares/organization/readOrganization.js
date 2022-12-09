import { OrganizationPermission } from "../../config/db.js"

const verifyReadOrganizationPermission = async (req, res, next) => {
  const { currentUser } = req
  const { organizationId } = req.params

  try {
    const permission = await OrganizationPermission.findOne({
      where: { userId: currentUser.id, organizationId: organizationId },
    })

    if (permission) {
      return next()
    }
    return res.sendStatus(401)
  } catch (err) {
    return res.sendStatus(401)
  }
}

export default verifyReadOrganizationPermission
