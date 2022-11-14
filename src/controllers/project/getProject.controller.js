import { Project } from "../../config/db.js"

const getProjectController = async (req, res) => {
  const id = req.params.projectId

  try {
    const project = await Project.findByPk(id)

    return res.status(200).json({ project: project })
  } catch (err) {
    return res.status(400).send(err.message)
  }
}

export default getProjectController
