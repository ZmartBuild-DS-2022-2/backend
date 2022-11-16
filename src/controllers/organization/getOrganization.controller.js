import { Organization } from "../../config/db.js"

const getOrganizationController = async (req, res) => {
  const id = await req.params.organizationId

  try {
    const organization = await Organization.findByPk(id)

    return res.status(201).json({ organization: organization })
  } catch (err) {
    return res.status(400).send(err.errors[0]?.message)
  }
}

export default getOrganizationController
