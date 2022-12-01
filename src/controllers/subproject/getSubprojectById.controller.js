import { SubProject, SubprojectImage, GTLFModel } from "../../config/db.js"

const getSubprojectByIdController = async (req, res) => {
  const { subprojectId } = req.params
  try {
    const subproject = await SubProject.findByPk(subprojectId, {
      attributes: ["id", "title", "description"],
      joinTableAttributes: [],
      include: [
        {
          model: SubprojectImage,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: GTLFModel,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    })
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
