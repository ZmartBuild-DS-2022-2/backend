import { Organization, ProjectImage } from "../../config/db.js"

const getProjectByIdController = async (req, res) => {
  const { currentUser } = req
  const { projectId } = req.params
  try {
    const project = await currentUser.getUserProjects({
      attributes: ["id", "name", "description"],
      where: { id: projectId },
      joinTableAttributes: ["role"],
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
    if (project.length > 0) return res.status(200).json(project[0])
    return res.status(404).send(`Couldn't find project with id ${projectId}`)
  } catch (err) {
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send("Something went wrong")
    }
  }
}

export default getProjectByIdController
