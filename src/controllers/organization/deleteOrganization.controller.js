import { Organization } from "../../config/db.js"

const deleteOrganizationController = async (req, res) => {
  const id = await req.params.organizationId

  try {
    await Organization.destroy({ where: { id: id } })
    return res.sendStatus(200)
  } catch (err) {
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send("Something went wrong")
    }
  }
}

export default deleteOrganizationController
