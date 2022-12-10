import { Subproject } from "../../config/db.js"

const deleteSubprojectController = async (req, res) => {
  // TODO: review permisions for deleting
  const id = req.params.projectId
  console.log("ENTRA MUAK")

  try {
    await Subproject.destroy({ where: { id: id } })
    return res.sendStatus(200)
  } catch (err) {
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send("Something went wrong")
    }
  }
}

export default deleteSubprojectController
