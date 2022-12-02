/* eslint-disable max-len */
// import { Organization } from "../../config/db.js"

const getUserInvitationsController = async (req, res) => {
  const { currentUser } = req
  // const { organizationId } = req.query
  try {
    const invitations = await currentUser.getInvitations({
      attributes: ["id", "userId", "objectiveId", "type", "accessType", "state"],
      joinTableAttributes: [],
    })

    return res.status(200).json(invitations)
  } catch (err) {
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send("Something went wrong")
    }
  }
}

export default getUserInvitationsController
