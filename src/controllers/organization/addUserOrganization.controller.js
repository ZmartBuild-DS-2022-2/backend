import { Organization, User } from "../../config/db.js"

const addUserOrganizationController = async (req, res) => {
  const organizationId = await req.params.organizationId
  const userId = await req.params.userId

  try {
    const user = await User.findByPk(userId)
    const organization = await Organization.findByPk(organizationId)

    await user.addOrganization(organization)

    const org = await Organization.findByPk(organization.id, {
      include: [
        { model: User, as: "users", attributes: ["id", "email"], through: { attributes: [] } },
      ],
    })

    return res.status(201).json({ org })
  } catch (err) {
    return res.status(400).json(err)
  }
}

export default addUserOrganizationController
