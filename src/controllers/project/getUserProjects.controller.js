import { Organization } from "../../config/db.js"

const getUserProjectsController = async (req, res) => {
  const { currentUser } = req
  const { organizationId } = req.query

  try {
    const projects = await currentUser.getProjects({
      attributes: ["id", "name", "description", "imgUrl"],
      joinTableAttributes: [],
      include: [
        {
          model: Organization,
          where: organizationId ? { id: organizationId } : {},
          attributes: { exclude: ["createdAt", "updatedAt"] }
        },
      ],
    })
    return res.status(200).json(projects)
  } catch (err) {
    return res.status(400).send(err.errors[0]?.message)
  }
}

export default getUserProjectsController
