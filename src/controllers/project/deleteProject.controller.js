import { Project } from "../../config/db.js"

const deleteProjectController = async (req, res) => {
  const id = req.params.projectId

  try {
    await Project.destroy({ where: { id: id } })
    return res.status(200)
  } catch (err) {
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send(err.message)
    }
  }
}

export default deleteProjectController
