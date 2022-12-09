import { Subproject, Project } from "../../config/db.js"

const getUserSubprojectsController = async (req, res) => {
  const { limit } = req.query
  const { currentUser } = req

  // We find the project and then we returned the subprojects
  try {
    const projects = await currentUser.getUserProjects({
      attributes: ["id", "name", "description", "createdAt"],
      order: [["createdAt", "DESC"]],
      joinTableAttributes: [],
    })

    const projectsIds = projects.map((project) => project.id)

    const subProjects = await Subproject.findAll({
      where: { projectId: projectsIds },
      order: [["createdAt", "DESC"]],
      limit,
      include: [
        {
          model: Project,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    })

    return res.status(200).json(subProjects)
  } catch (err) {
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send("Something went wrong")
    }
  }
}

export default getUserSubprojectsController
