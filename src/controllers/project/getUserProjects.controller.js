const getUserProjectsController = async (req, res) => {
  const { currentUser } = req

  try {
    const projects = await currentUser.getProjects({
      attributes: ["id", "name", "description", "imgUrl"],
      joinTableAttributes: [],
    })
    return res.status(200).json(projects)
  } catch (err) {
    return res.status(400).send(err.errors[0]?.message)
  }
}

export default getUserProjectsController
