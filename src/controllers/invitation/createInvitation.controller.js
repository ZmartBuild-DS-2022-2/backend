import { Invitation, User, Organization, Project } from "../../config/db.js"

const createInvitationController = async (req, res) => {
  // ObjetiveId is the Organization or Project id associate with the Invitation
  const { objectiveId, email, type, accessType } = req.body
  if (!email || !type || !objectiveId) {
    return res.status(400).send("You must send an email and the required data")
  }
  if (type == "Project" && !accessType) return res.status(400).send("You must send an accessType")

  const { currentUser } = req
  if (currentUser.email == email)
    return res.status(400).send("You can't send invitations to yourself")

  // User who received the invitation
  const userObjective = await User.findOne({ where: { email: email } })

  if (!userObjective) return res.status(400).send("We couldn't find the user :(")

  // Check if there is already an invitation
  let prevInvitation
  if (type == "project")
    prevInvitation = await Invitation.findOne({
      where: { userId: userObjective?.id, projectId: objectiveId },
    })
  else
    prevInvitation = await Invitation.findOne({
      where: { userId: userObjective?.id, organizationId: objectiveId },
    })

  if (prevInvitation) return res.status(400).send("You have already sent an invitation")

  const data = {
    type: type,
    accessType: accessType,
    state: "Waiting",
  }

  const invitation = Invitation.build(data)

  try {
    let newInvitation = await invitation.save({
      fields: ["type", "accessType", "state"],
    })

    // Associations
    await userObjective.addInvitation(newInvitation)

    if (type == "project") {
      const project = await Project.findByPk(objectiveId)
      await project.addInvitation(newInvitation)
    } else if (type == "organization") {
      const organization = await Organization.findByPk(objectiveId)
      await organization.addInvitation(newInvitation)
    }

    return res.status(201).json({
      id: newInvitation.id,
      type: newInvitation.type,
      accessType: newInvitation.accessType,
      state: newInvitation.state,
    })
  } catch (err) {
    console.log(err)
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch (err2) {
      return res.status(400).send("Something went wrong")
    }
  }
}

export default createInvitationController
