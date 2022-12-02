/* eslint-disable max-len */
// import { Organization } from "../../config/db.js"

const mockData = {
  organization: [
    {
      id: "1",
      name: "ZmartBuild",
      imgUrl:
        "https://www.minecraft.net/etc.clientlibs/minecraft/clientlibs/main/resources/img/minecraft-creeper-face.jpg",
      createdAt: "12/11/2022",
    },
    {
      id: "2",
      name: "Inmobiliaria Berlini",
      imgUrl:
        "https://www.minecraft.net/etc.clientlibs/minecraft/clientlibs/main/resources/img/minecraft-creeper-face.jpg",
      createdAt: "12/11/2022",
    },
    {
      id: "3",
      name: "Constructora Los Castores Felices S.A",
      imgUrl:
        "https://www.minecraft.net/etc.clientlibs/minecraft/clientlibs/main/resources/img/minecraft-creeper-face.jpg",
      createdAt: "12/11/2022",
    },
    {
      id: "4",
      name: "Fundación Mi Casita",
      imgUrl:
        "https://www.minecraft.net/etc.clientlibs/minecraft/clientlibs/main/resources/img/minecraft-creeper-face.jpg",
      createdAt: "12/11/2022",
    },
  ],
  project: [
    {
      id: "5",
      name: "Proyecto Especial",
      imgUrl:
        "https://www.minecraft.net/etc.clientlibs/minecraft/clientlibs/main/resources/img/minecraft-creeper-face.jpg",
      createdAt: "12/11/2022",
      accessType: "a",
    },
    {
      id: "6",
      name: "Proyecto Especial 2",
      imgUrl:
        "https://www.minecraft.net/etc.clientlibs/minecraft/clientlibs/main/resources/img/minecraft-creeper-face.jpg",
      createdAt: "12/11/2022",
      accessType: "a",
    },
  ],
}

const getUserInvitationsController = async (req, res) => {
  const { currentUser } = req
  // const { organizationId } = req.query
  try {
    const invitations = await currentUser.getInvitations({
      attributes: ["id", "userId", "objectiveId", "type", "accessType", "state"],
      joinTableAttributes: [],
    })

    console.log("----------")
    console.log(invitations)
    console.log("----------")
    return res.status(200).json(mockData)
  } catch (err) {
    try {
      return res.status(400).send(err.errors[0]?.message)
    } catch {
      return res.status(400).send("Something went wrong")
    }
  }
}

export default getUserInvitationsController
