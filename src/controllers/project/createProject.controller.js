import { Organization, Project } from "../../config/db.js"
import uploadFileToS3 from "../../helpers/s3FileUpload.js"

const createProjectController = async (req, res) => {
  const { organizationId } = req.params
  const { name } = req.body
  if (!name) {
    return res.status(400).send("You must complete all required fields")
  }
  let images
  if (req.files) images = Object.values(req.files)
  const user = req.currentUser
  const organization = await Organization.findByPk(organizationId)
  req.body.imgsUrls = ""
  const project = Project.build(req.body)
  try {
    const newProject = await project.save({ fields: ["name", "description", "imgsUrls"] })
    await organization.addProject(newProject)
    await user.addUserProject(newProject, { through: { role: "a" } })

    let imgsUrls = ""
    try {
      if (images) {
        imgsUrls = []
        await Promise.all(
          images.map(async (image) => {
            const params = { Key: `images/projects/${newProject.id}/${image.name}` }
            imgsUrls.push(await uploadFileToS3(image, params))
          })
        )
        imgsUrls = imgsUrls.join(";")
        await Project.update({ imgsUrls }, { where: { id: newProject.id } })
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }

    return res.status(201).json({
      id: newProject.id,
      name: newProject.name,
      description: newProject.description,
      imgsUrls: imgsUrls,
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
