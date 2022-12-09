const getOrganizationByIdController = async (req, res) => {
  const { currentUser } = req
  const { organizationId } = req.params
  try {
    const organization = await currentUser.getUserOrganizations({
      attributes: ["id", "name", "email", "description", "websiteUrl", "imgUrl"],
      where: { id: organizationId },
      joinTableAttributes: ["role"],
    })
    if (organization.length > 0) return res.status(200).json(organization[0])
    return res.status(404).send(`Couldn't find organization with id ${organizationId}`)
  } catch (err) {
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send("Something went wrong")
    }
  }
}

export default getOrganizationByIdController
