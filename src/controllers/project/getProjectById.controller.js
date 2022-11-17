import { Project } from "../../config/db.js"
import getImagesUrl from "../../helpers/getImagesUrls.js"

const getProjectByIdController = async (req, res) => {
  const { projectId } = req.params
  try {
    const project = await Project.findByPk(projectId, {
      attributes: ["id", "name", "description", "imgsUrls"],
    })
    project.imgsUrls = getImagesUrl(project.imgsUrls)
    return res.status(200).json(project)
  } catch (err) {
    return res.status(400).send(err)
  }
}

export default getProjectByIdController
