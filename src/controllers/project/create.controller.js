import { Project } from "../../config/db.js"

const createController = async (req, res) => {
  const { name, description } = req.body
  if (!name || !description ) {
    return res.status(400).send("You must complete all required fields")
  }

  const project = Project.build(req.body)
  try {
    const newProject = await project.save({
      fields: ["name", "description", "location", "imgLocation"]
    })
    await req.currentUser.addProject(newProject, { through: { role: "a" } })

    return res
      .status(201)
      .json({
        id: newProject.id,
        name: newProject.name,
        description: newProject.description,
        location: newProject.location,
        imgLocation: newProject.imgLocation
      })
  } catch (err) {
    return res.status(400).send(err.errors[0]?.message)
  }
}

export default createController
