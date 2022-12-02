import { Invitation, User } from "../../config/db.js"

const createInvitationController = async (req, res) => {
  // ObjetiveId is the Organization or Project id associate with the Invitation
  const { objectiveId, email, type, accessType } = req.body
  console.log("CONTROLLER")
  console.log("OBJ:", objectiveId)
  if (!email || !type || !objectiveId) {
    return res.status(400).send("You must send an email and the required data")
  }
  if (type == "Project" && !accessType) return res.status(400).send("You must send an accessType")

  // User who received the invitation
  const userObjective = await User.findOne({ where: { email: email } })

  if (!userObjective) return res.status(400).send("We couldn't find the user :(")

  // Check if there is already an invitation
  const prevInvitation = await Invitation.findOne({
    where: { userId: userObjective?.id, objectiveId: objectiveId },
  })

  if (prevInvitation) return res.status(400).send("You have already sent an invitation")

  const data = {
    objectiveId: objectiveId,
    type: type,
    accessType: accessType,
    state: "Waiting",
  }

  const invitation = Invitation.build(data)
  const all = await Invitation.findAll()
  console.log("ALL:", all)

  console.log("INV:", invitation)

  try {
    let newInvitation = await invitation.save({
      fields: ["objectiveId", "type", "accessType", "state"],
    })

    await userObjective.addInvitation(newInvitation)

    return res.status(201).json({
      id: newInvitation.id,
      objectiveId: newInvitation.objectiveId,
      type: newInvitation.type,
      accessType: newInvitation.accessType,
      state: newInvitation.state,
    })
  } catch (err) {
    console.log(err)
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch (err2) {
      // console.log(err2)
      return res.status(400).send("Something went wrong")
    }
  }
}

export default createInvitationController
