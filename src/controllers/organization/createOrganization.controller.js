import { Organization } from "../../config/db.js"

const createOrganizationController = async (req, res) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).send("You must complete all required fields")
  }
  
  const user = req.currentUser
  const organization = Organization.build(req.body)
  try {
    let newOrganization = await organization.save({
      fields: ["name", "email", "description", "websiteUrl", "imgUrl"],
    })
    newOrganization = await Organization.findByPk(newOrganization.id)
    await user.addOrganization(newOrganization)

    return res.status(201).json({
      id: newOrganization.id,
      email: newOrganization.email,
      name: newOrganization.name,
      description: newOrganization.description,
      websiteUrl: newOrganization.websiteUrl,
      imgUrl: newOrganization.imgUrl,
    })
  } catch (err) {
    return res.status(400).json(err)
  }
}

export default createOrganizationController
