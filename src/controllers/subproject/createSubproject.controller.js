import { Project, SubProject } from "../../config/db.js"
//Nose si consideramos imágen en subproyectos **

const createSubprojectController = async (req, res) => {
    console.log("resulta?")

  const { projectId } = req.params
  const { title } = req.body
  if (!title) {
    return res.status(400).send("You must complete all required fields")
  }

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
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send("Something went wrong")
    }
  }
}

export default createSubprojectController