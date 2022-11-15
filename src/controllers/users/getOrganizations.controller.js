import { User } from "../../config/db.js"

const getOrganizationsController = async (req, res) => {
  try {
    // const userProjects = await User.findByPk(req.currentUser.id, { include: "projects" })
    const userOrganizations = await User.findByPk(req.currentUser.id, { include: "organizations" })

    const organizations = []

    userOrganizations.organizations.forEach((item) => {
      organizations.push({
        id: item.id,
        email: item.email,
        name: item.name,
        description: item.description,
      })
    })

    return res.status(200).json({ organizations: organizations })
  } catch (err) {
    return res.status(400).json(err)
  }
}

export default getOrganizationsController
