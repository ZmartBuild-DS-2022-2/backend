import { Organization, Project, ProjectImage } from "../../config/db.js"

const getProjectByIdController = async (req, res) => {
  const { projectId } = req.params
  try {
    const project = await Project.findByPk(projectId, {
      attributes: ["id", "name", "description"],
      joinTableAttributes: [],
      include: [
        {
          model: Organization,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: ProjectImage,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    })
    return res.status(200).json(project)
  } catch (err) {
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send("Something went wrong")
    }
  }
}

export default getProjectByIdController
