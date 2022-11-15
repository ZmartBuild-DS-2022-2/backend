import { Organization, User } from "../config/db.js"

const verifyOrganizationPermission = async (req, res, next) => {
  const id = req.params.organizationId

  const userOrganizations = await User.findByPk(req.currentUser.id, {
    include: [
      {
        model: Organization,
        as: "organizations",
        attributes: ["id"],
        through: { attributes: [] },
      },
    ],
  })

  let permission = false
  userOrganizations.organizations.forEach((item) => {
    if (id == item.id) {
        permission = true
    } 
  })

  if (permission) {
    return next()
  }
  return res.sendStatus(401)
}

export default verifyOrganizationPermission