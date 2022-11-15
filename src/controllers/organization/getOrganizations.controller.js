import { Organization } from "../../config/db.js"

const getOrganizationsController = async (req, res) => {
  try {
    const organizations = await Organization.findAll({
      attributes: ["id", "name", "description"],
    })
    return res.status(201).json({ organizations })
  } catch (err) {
    return res.status(400).json(err)
  }
}

export default getOrganizationsController
