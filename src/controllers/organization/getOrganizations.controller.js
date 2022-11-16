const getOrganizationsController = async (req, res) => {
  const { currentUser } = req

  try {
    const organizations = await currentUser.getOrganizations({
      attributes: ["id", "name", "email", "description", "websiteUrl", "imgUrl"],
      joinTableAttributes: [],
    })
    return res.status(201).json(organizations)
  } catch (err) {
    return res.status(400).send(err.errors[0]?.message)
  }
}

export default getOrganizationsController
