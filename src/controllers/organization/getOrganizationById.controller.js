import { Organization } from "../../config/db.js"

const getOrganizationByIdController = async (req, res) => {
  const { organizationId } = req.params
  try {
    let organization = await Organization.findByPk(organizationId, {
      attributes: ["name", "email", "description", "websiteUrl", "imgUrl"],
    })
    return res.status(201).json(organization)
  } catch (err) {
    return res.status(400).send(err.errors[0]?.message)
  }
}

export default getOrganizationByIdController
