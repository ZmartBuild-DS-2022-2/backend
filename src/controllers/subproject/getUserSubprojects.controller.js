// import { Organization, ProjectImage } from "../../config/db.js"

const mockData = [
  {
    id: "1",
    name: "Foundations",
    description: "Foundations model with measures",
  },
  {
    id: "2",
    name: "Lifting Pulleys",
    description: "Lifting Pulleys model with measures",
  },
  {
    id: "3",
    name: "Structure and metals",
    description: "Structure and metals model",
  },
]

const getUserSubprojectsController = async (req, res) => {
  console.log(req)

  return res.status(200).json(mockData)
}

export default getUserSubprojectsController
