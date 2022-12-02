import { Invitation } from "../../config/db.js"

const createInvitationController = async (req, res) => {
  const { userId, objectiveId, type, accessType } = req.body
  if (!objectiveId || !type) return res.status(400).send("You must send an objective and a type")
  if (type == "Project" && !accessType) return res.status(400).send("You must send an accessType")

  const data = {
    objectiveId: objectiveId,
    userId: userId,
    type: type,
    accessType: accessType,
    state: "Waiting",
  }

  const user = req.currentUser
  const invitation = Invitation.build(data)

  try {
    let newInvitation = await invitation.save({
      fields: ["objectiveId", "type", "accessType", "state"],
    })

    await user.addInvitation(newInvitation)

    return res.status(201).json({
      id: newInvitation.id,
      objectiveId: newInvitation.objectiveId,
      type: newInvitation.type,
      accessType: newInvitation.accessType,
    })
  } catch (err) {
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send("Something went wrong")
    }
  }
}

export default createInvitationController
