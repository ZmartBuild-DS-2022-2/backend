import { Organization } from "../../config/db.js"

const createOrganizationController = async (req, res) => {
  const { email, name, description, websiteUrl, imgUrl } = req.body
  if (!email || !name || !description || !websiteUrl || !imgUrl) {
    return res.status(400).send("You must complete all fields")
  }

  const organization = Organization.build(req.body)
  try {
    const user = req.currentUser
    const newOrganization = await organization.save({
      fields: ["email", "name", "description", "websiteUrl", "imgUrl"],
    })

    const org = await Organization.findByPk(newOrganization.id)
    await user.addOrganization(org)

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
