import { Organization } from "../../config/db.js"

const updateOrganizationController = async (req, res) => {
  const { email, name, description, websiteUrl, imgUrl } = req.body
  const fields = [email, name, description, websiteUrl, imgUrl]
  const allowedFields = ["email", "name", "description", "websiteUrl", "imgUrl"]
  const id = await req.params.organizationId

  let updater = {}
  fields.forEach((item, index) => {
    if (item) {
      updater[allowedFields[index]] = item
    }
  })

  try {
    await Organization.update(updater, { where: { id: id } })
    const organization = await Organization.findByPk(id)

    return res.status(200).json({
      id: organization.id,
      email: organization.email,
      name: organization.name,
      description: organization.description,
      websiteUrl: organization.websiteUrl,
      imgUrl: organization.imgUrl,
    })
  } catch (err) {
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send("Something went wrong")
    }
  }
}

export default updateOrganizationController
