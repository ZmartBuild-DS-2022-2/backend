import { Organization, Project, Subproject, SubprojectImage, Gltf, User } from "../../config/db.js"

const getSubprojectByIdController = async (req, res) => {
  const { currentUser } = req
  const { subprojectId } = req.params

  try {
    let subproject = await Subproject.findByPk(subprojectId, {
      attributes: ["id", "title", "description"],
      include: [
        {
          model: Project,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [
            {
              model: User,
              as: "projectUsers",
              where: { email: currentUser.email },
            },
            {
              model: Organization,
              attributes: ["id", "name", "email", "description", "websiteUrl", "imgUrl"],
            },
          ],
        },
        {
          model: SubprojectImage,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Gltf,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    })

    return res.status(200).json(subproject)
  } catch (err) {
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send("Something went wrong")
    }
  }
}

export default getSubprojectByIdController
