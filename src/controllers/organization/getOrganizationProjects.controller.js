import { Organization, ProjectImage } from "../../config/db.js"

const getOrganizationProjectsController = async (req, res) => {
  console.log("---Controller---")
  const { currentUser } = req
  const { organizationId } = req.params
  const { limit } = req.query
  try {
    const projects = await currentUser.getUserProjects({
      attributes: ["id", "name", "description", "createdAt"],
      limit,
      order: [["createdAt", "DESC"]],
      joinTableAttributes: [],
      include: [
        {
          model: Organization,
          where: organizationId ? { id: organizationId } : {},
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: ProjectImage,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    })
    return res.status(200).json(projects)
  } catch (err) {
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send("Something went wrong")
    }
  }
}

export default getOrganizationProjectsController
