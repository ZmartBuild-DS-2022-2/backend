import { Project } from "../../config/db.js"

const updateProjectController = async (req, res) => {
  const { name, description, location, imgLocation } = req.body
  const fields = [name, description, location, imgLocation]
  const allowedFields = ["name", "description", "location"]
  const id = req.params.projectId

  let updater = {}
  fields.forEach((item, index) => {
    if (item) {
      updater[allowedFields[index]] = item
    }
  })

  try {
    await Project.update(updater, { where: { id: id } })
    const project = await Project.findByPk(id)

    return res.status(200).json({
      id: project.id,
      name: project.name,
      description: project.description,
      location: project.location,
      imgLocation: project.imgLocation,
    })
  } catch (err) {
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send("Something went wrong")
    }
  }
}

export default updateProjectController
