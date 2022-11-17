import { Organization, User } from "../../config/db.js"

const addUserToOrganizationController = async (req, res) => {
  const { organizationId } = req.params
  const { userEmail } = req.body
  if (!userEmail) {
    return res.status(400).send("You must complete all fields")
  }

  const addedUser = await User.findOne({ where: { email: userEmail } })
  if (!addedUser) {
    return res.status(400).send("There's no user with the given email")
  }

  try {
    const organization = await Organization.findByPk(organizationId)
    await addedUser.addUserOrganization(organization)
    return res.sendStatus(201)
  } catch (err) {
    return res.status(400).send(err.errors[0]?.message)
  }
}

export default addUserToOrganizationController
