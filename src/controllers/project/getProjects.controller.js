import { User } from "../../config/db.js"

const getProjectsController = async (req, res) => {
  const userProjects = await User.findByPk(req.currentUser.id, { include: "projects" })

  const projects = []

  userProjects.projects.forEach((item) => {
    projects.push({
      id: item.id,
      name: item.name,
      description: item.description,
      projectPermission: {
        role: item.projectPermission.role,
      },
    })
  })

  return res.status(200).json({ projects: projects })
}

export default getProjectsController
