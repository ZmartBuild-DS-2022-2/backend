import { Project } from "../../config/db.js"

const getOneController = async (req, res) => {
  const { id } = req.body

  // PERMISSION MIDDLEWARE

  try {
    const project = await Project.findByPk(id)

    return res.status(200).json({ "project": project })
  } catch (err) {
    return res.status(400).send(err.message)
  }

}

export default getOneController
