import { Organization, Project, ProjectImage } from "../../config/db.js"
import uploadFileToS3 from "../../helpers/s3FileUpload.js"

const createProjectController = async (req, res) => {
  const { organizationId } = req.params
  const { name } = req.body
  if (!name) {
    return res.status(400).send("You must complete all required fields")
  }

  let imagesFiles = req.files?.images
  imagesFiles = imagesFiles.constructor === Object ? [req.files?.images] : req.files?.images
  const user = req.currentUser
  const organization = await Organization.findByPk(organizationId)
  const project = Project.build(req.body)

  try {
    const newProject = await project.save({ fields: ["name", "description"] })
    await organization.addProject(newProject)
    await user.addUserProject(newProject, { through: { role: "a" } })

    try {
      if (imagesFiles) {
        await Promise.all(
          imagesFiles.map(async (imageFile) => {
            const uploadParams = { Key: `images/projects/${newProject.id}/${imageFile.name}` }
            const imgUrl = await uploadFileToS3(imageFile, uploadParams)
            const image = ProjectImage.build({ url: imgUrl })
            const newProjectImage = await image.save({ fields: ["url"] })
            await newProject.addProjectImage(newProjectImage)
          })
        )
      }
    } catch (err) {
      try {
        return res.status(400).send(err.errors[0]?.message)
      } catch {
        return res.status(400).send("Something went wrong")
      }
    }

    return res.status(201).json({
      id: newProject.id,
      name: newProject.name,
      description: newProject.description,
    })
  } catch (err) {
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send("Something went wrong")
    }
  }
}

export default createProjectController
