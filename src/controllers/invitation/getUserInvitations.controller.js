import { Organization, Project } from "../../config/db.js"

const getUserInvitationsController = async (req, res) => {
  const { currentUser } = req

  try {
    const invitations = await currentUser.getInvitations({
      attributes: ["id", "userId", "type", "accessType", "state", "createdAt"],
      joinTableAttributes: [],
      include: [
        {
          model: Organization,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Project,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    })

    return res.status(200).json(invitations)
  } catch (err) {
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send("Something went wrong while retrieving the invitations")
    }
  }
}

export default getUserInvitationsController
