import { Organization, Project, Subproject, SubprojectImage, Gltf } from "../../config/db.js"

const getSubprojectByIdController = async (req, res) => {
  const { subprojectId } = req.params

  try {
    let subproject = await Subproject.findByPk(subprojectId, {
      attributes: ["id", "title", "description"],
      joinTableAttributes: [],
      include: [
        {
          model: Project,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: SubprojectImage,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Gltf,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    })

    const orga = await Organization.findByPk(subproject.project.organizationId, {
      attributes: ["id", "name", "email", "description", "websiteUrl", "imgUrl"],
    })

    // Force to add organization to subproject
    // I don't know if there is a better and fast way
    subproject.dataValues.organization = orga
    return res.status(200).json(subproject)
  } catch (err) {
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send("Something went wrong")
    }
  }
}

export default getSubprojectByIdController
