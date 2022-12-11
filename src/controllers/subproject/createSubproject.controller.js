import { Project, Subproject, SubprojectImage, Gltf } from "../../config/db.js"
import uploadFileToS3 from "../../helpers/s3FileUpload.js"
import { uploadModelFilesToS3 } from "../../helpers/uploadModel.js"

const createSubprojectController = async (req, res) => {
  const { projectId } = req.params
  const { title, description } = req.body
  if (!title || !description) return res.status(400).send("You must complete all required fields")

  let imagesFiles = req.files?.images
  imagesFiles = imagesFiles?.constructor === Object ? [imagesFiles] : req.files?.images

  const binFile = req.files?.bin_file
  const gltfFile = req.files?.gltf_file

  const existsModel = binFile && gltfFile

  const project = await Project.findByPk(projectId)
  const subproject = Subproject.build(req.body)

  try {
    const newSubproject = await subproject.save({ fields: ["title", "description"] })
    await project.addSubProject(newSubproject)

    if (existsModel) {
      try {
        // 3D models are created and saved
        const { gltf_file, bin_file } = req.files
        const modelFilesUrl = await uploadModelFilesToS3(newSubproject.id, { gltf_file, bin_file })
        const newGltfModel = Gltf.build({ url: modelFilesUrl })
        const newGltfModelCreated = await newGltfModel.save({ fields: ["url"] })
        await subproject.addGltfmodel(newGltfModelCreated)
      } catch (err) {
        return res.status(400).send("Something went wrong uploading the model")
      }
    }

    if (imagesFiles) {
      try {
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
      } catch (err) {
        try {
          return res.status(400).send(err.errors[0]?.message)
        } catch {
          return res.status(400).send("Something went wrong uploading a file")
        }
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
