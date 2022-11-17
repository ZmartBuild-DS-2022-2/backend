import { Organization, Project } from "../../config/db.js"

const createProjectController = async (req, res) => {
  const { organizationId } = req.params
  const { name } = req.body
  if (!name) {
    return res.status(400).send("You must complete all required fields")
  }

  const user = req.currentUser
  const organization = await Organization.findByPk(organizationId)
  const project = Project.build(req.body)
  try {
    const newProject = await project.save({ fields: ["name", "description", "imgUrl"] })
    await organization.addProject(newProject)
    await user.addProject(newProject, { through: { role: "a" } })

    return res.status(201).json({
      id: newProject.id,
      name: newProject.name,
      description: newProject.description,
      imgUrl: newProject.imgLocation,
    })
  } catch (err) {
    return res.status(400).send(err.errors[0]?.message)
  }
}

export default createProjectController
