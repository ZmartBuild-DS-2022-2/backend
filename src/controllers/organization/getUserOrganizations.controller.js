const getUserOrganizationsController = async (req, res) => {
  const { currentUser } = req

  try {
    const { limit } = req.query
    const organizations = await currentUser.getUserOrganizations({
      attributes: ["id", "name", "email", "description", "websiteUrl", "imgUrl", "createdAt"],
      order: [["createdAt", "DESC"]],
      limit,
      joinTableAttributes: ["role"],
    })
    return res.status(200).json(organizations)
  } catch (err) {
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send("Something went wrong")
    }
  }
}

export default getUserOrganizationsController
