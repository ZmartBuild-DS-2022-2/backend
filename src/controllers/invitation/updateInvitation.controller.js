import { Invitation, Project, Organization } from "../../config/db.js"

const updateInvitationController = async (req, res) => {
  const { id, state, accessType } = req.body
  if (!state || !accessType || !id) return res.status(400).send("You must send all required info")

  if (!(state == "Accepted" || state == "Declined" || state == "Waiting"))
    return res.status(400).send(`${state} is not a valid invitation state`)

  const fields = [state]
  const allowedFields = ["state"]

  const { currentUser } = req

  let updater = {}
  fields.forEach((item, index) => {
    if (item) {
      updater[allowedFields[index]] = item
    }
  })

  try {
    await Invitation.update(updater, { where: { id: id } })
    const invitation = await Invitation.findByPk(id)

    if (state == "Accepted") {
      if (invitation.type == "organization") {
        const organization = await Organization.findByPk(invitation.organizationId)
        await currentUser.addUserOrganization(organization)
      } else if (invitation.type == "project") {
        const project = await Project.findByPk(invitation.projectId)
        await currentUser.addUserProject(project, { through: { role: accessType } })
      }
    }

    return res.status(200).json({
      id: invitation.id,
      type: invitation.type,
      accessType: invitation.accessType,
    })
  } catch (err) {
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send("Something went wrong")
    }
  }
}

export default updateInvitationController
