import { Subproject } from "../../config/db.js"

const updateSubprojectController = async (req, res) => {
  const { title, description } = req.body
  const fields = [title, description]
  const allowedFields = ["title", "description"]
  const id = req.params.subprojectId

  let updater = {}
  fields.forEach((item, index) => {
    if (item) {
      updater[allowedFields[index]] = item
    }
  })

  try {
    await Subproject.update(updater, { where: { id: id } })
    const subproject = await Subproject.findByPk(id)

    return res.status(200).json({
      id: subproject.id,
      name: subproject.name,
      description: subproject.description,
      location: subproject.location,
      imgLocation: subproject.imgLocation,
    })
  } catch (err) {
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send("Something went wrong")
    }
  }
}

export default updateSubprojectController
