import { Project, Subproject } from "../../config/db.js"

const getProjectSubprojectsController = async (req, res) => {
  const { projectId } = req.params
  // We find the project and then we returned the subprojects
  try {
    const project = await Project.findByPk(projectId, {
      attributes: ["id", "name", "description"],
      joinTableAttributes: [],
      include: [
        {
          model: Subproject,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    })

    return res.status(200).json(project.subProjects)
  } catch (err) {
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send("Something went wrong")
    }
  }
}

export default getProjectSubprojectsController
