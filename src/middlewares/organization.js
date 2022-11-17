import { Organization, User } from "../config/db.js"

const verifyOrganizationPermission = async (req, res, next) => {
  const { organizationId } = req.params

  try {
    const userOrganizations = await User.findByPk(req.currentUser.id, {
      include: [
        {
          model: Organization,
          as: "organizations",
          attributes: ["id"],
          through: { attributes: [] },
          where: { id: organizationId },
        },
      ],
    })

    if (userOrganizations) {
      return next()
    }
    return res.sendStatus(401)
  } catch (err) {
    return res.sendStatus(401)
  }
}

export default verifyOrganizationPermission
