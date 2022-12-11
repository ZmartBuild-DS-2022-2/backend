import { Invitation, User, Organization, Project } from "../../config/db.js"

const createInvitationController = async (req, res) => {
  // ObjetiveId is the Organization or Project id associate with the Invitation
  const { objectiveId, email, type, accessType } = req.body
  if (!email || !type || !objectiveId) {
    return res.status(400).send("You must send an email and the required data")
  }
  if (type == "project" && !accessType) return res.status(400).send("You must send an accessType")

  const { currentUser } = req
  if (currentUser.email == email)
    return res.status(400).send("You can't send an invitation to yourself")

  // User who received the invitation
  const userObjective = await User.findOne({ where: { email: email } })

  if (!userObjective) return res.status(400).send("We couldn't find the user :(")

  // Verificamos que el usuario no tenga ese projecto asignado, o esa organizacion asignada
  let proyecto
  let organization
  let userIsInThisOrganization
  let userIsInThisProject

  if (type == "project") {
    proyecto = await Project.findByPk(objectiveId)
    userIsInThisProject = await userObjective.hasUserProjects(proyecto)
  } else if (type == "organization") {
    organization = await Organization.findByPk(objectiveId)
    userIsInThisOrganization = await userObjective.hasUserOrganizations(organization)
  } else return res.status(400).send(`Can't create invitation for ${type} type`)

  if (userIsInThisProject) return res.status(400).send(`The user already belongs to that project.`)

  if (userIsInThisOrganization)
    return res.status(400).send(`The user already belongs to that organization.`)

  // Check if there is already an invitation
  let prevInvitation
  if (type == "project")
    prevInvitation = await Invitation.findOne({
      where: { userId: userObjective?.id, projectId: objectiveId },
    })
  else if (type == "organization")
    prevInvitation = await Invitation.findOne({
      where: { userId: userObjective?.id, organizationId: objectiveId },
    })
  else return res.status(400).send(`Can't create invitation for ${type} type`)

  if (prevInvitation)
    return res.status(400).send(`You have already sent an invitation for this ${type} to the user`)

  //-----
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
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch (err2) {
      return res.status(400).send("Something went wrong while creating the invitation")
    }
  }
}

export default createInvitationController
