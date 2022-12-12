import { Organization } from "../../config/db.js"
import uploadFileToS3 from "../../helpers/s3FileUpload.js"

const createOrganizationController = async (req, res) => {
  const { name } = req.body
  if (!name) return res.status(400).send("You must complete all required fields")

  let image
  if (req.files) image = req.files.image

  const user = req.currentUser
  const organization = Organization.build(req.body)

  try {
    let imgUrl = ""

    if (image) {
      const params = { Key: `images/organizations/${newOrganization.id}/logo` }
      imgUrl = await uploadFileToS3(image, params)
    }

    let newOrganization = await organization.save({
      fields: ["name", "email", "description", "websiteUrl"],
    })

    newOrganization = await Organization.findByPk(newOrganization.id)
    await Organization.update({ imgUrl }, { where: { id: newOrganization.id } })
    await user.addUserOrganization(newOrganization, { through: { role: "a" } })

    return res.status(201).json({
      id: newOrganization.id,
      email: newOrganization.email,
      name: newOrganization.name,
      description: newOrganization.description,
      websiteUrl: newOrganization.websiteUrl,
      imgUrl: newOrganization.imgUrl,
    })
  } catch (err) {
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send("Something went wrong")
    }
  }
}

export default createOrganizationController
