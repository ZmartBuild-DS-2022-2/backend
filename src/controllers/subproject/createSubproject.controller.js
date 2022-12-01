import { Project, Subproject, SubprojectImage } from "../../config/db.js"
import uploadFileToS3 from "../../helpers/s3FileUpload.js"

const createSubprojectController = async (req, res) => {
  const { projectId } = req.params
  const { title, description } = req.body
  if (!title || !description) return res.status(400).send("You must complete all required fields")

  let imagesFiles = req.files?.images
  imagesFiles = imagesFiles?.constructor === Object ? [imagesFiles] : req.files?.images

  const project = await Project.findByPk(projectId)
  const subproject = Subproject.build(req.body)

  try {
    const newSubproject = await subproject.save({ fields: ["title", "description"] })

    await project.addSubProject(newSubproject)

    try {
      if (imagesFiles) {
        await Promise.all(
          imagesFiles.map(async (imageFile) => {
            const uploadParams = {
              Key: `images/projects/${projectId}/subprojects/${newSubproject.id}/${imageFile.name}`,
            }
            const imgUrl = await uploadFileToS3(imageFile, uploadParams)
            const image = SubprojectImage.build({ url: imgUrl })
            const newProjectImage = await image.save({ fields: ["url"] })
            await newSubproject.addSubprojectImage(newProjectImage)
          })
        )
      }
    } catch (err) {
      try {
        return res.status(400).send(err.errors[0]?.message)
      } catch {
        return res.status(400).send("Something went wrong uploading a file")
      }
    }

    return res.status(201).json({
      id: newSubproject.id,
      title: newSubproject.title,
      description: newSubproject.description,
    })
  } catch (err) {
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send("Something went wrong creating the subproject")
    }
  }
}

export default createSubprojectController
