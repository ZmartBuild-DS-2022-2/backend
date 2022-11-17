import { Organization } from "../../config/db.js"

const getOrganizationByIdController = async (req, res) => {
  const { organizationId } = req.params
  try {
    let organization = await Organization.findByPk(organizationId, {
      attributes: ["id", "name", "email", "description", "websiteUrl", "imgUrl"],
    })
    return res.status(200).json(organization)
  } catch (err) {
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send("Something went wrong")
    }
  }
}

export default getOrganizationByIdController
