import { Project, SubProject } from "../../config/db.js"

const createSubprojectController = async (req, res) => {
  const { projectId } = req.params
  const { title, description } = req.body
  if (!title || !description) return res.status(400).send("You must complete all required fields")

  // Remains checking images

  const project = await Project.findByPk(projectId)
  const subproject = SubProject.build(req.body)

  try {
    const newSubproject = await subproject.save({ fields: ["title", "description"] })
    await project.addProject(newSubproject)

    return res.status(201).json({
      id: newSubproject.id,
      title: newSubproject.title,
      description: newSubproject.description,
    })
  } catch (err) {
    console.log("ERROR:", err)
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send("Something went wrong")
    }
  }
}

export default createSubprojectController
