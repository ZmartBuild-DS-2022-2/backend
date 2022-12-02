/* eslint-disable max-len */
import { Organization, Project } from "../../config/db.js"

const getUserInvitationsController = async (req, res) => {
  const { currentUser } = req
  // const { organizationId } = req.query
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
    console.log(err)
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send("Something went wrong")
    }
  }
}

export default getUserInvitationsController
