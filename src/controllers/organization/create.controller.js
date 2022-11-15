import { Organization, User} from "../../config/db.js"


const createController = async (req, res) => {
  const { email, name, description, websiteUrl, imgUrl} = req.body
  if (!email || !name || !description || !websiteUrl || !imgUrl) {
    return res.status(400).send("You must complete all fields")
  }

  const organization = Organization.build(req.body)
  try {
    const user = req.currentUser
    const newOrganization = await organization.save({ fields: 
      ["email", "name", "description", "websiteUrl", "imgUrl"] })

    const org = await Organization.findByPk(newOrganization.id)
    await user.addOrganization(org)
    console.log(user)

    const xd2 = await Organization.findByPk(newOrganization.id, {include:
      [{model:User,as:"users", attributes: ["email"],through: {attributes:[]}}]})
    // console.log(xd2)
    // console.log(xd2.users[0])



    return res
      .status(201)
      .json({ 
        
        id: newOrganization.id, 
        email: newOrganization.email, 
        name: newOrganization.name, 
        description: newOrganization.description,
        websiteUrl: newOrganization.websiteUrl,
        imgUrl: newOrganization.imgUrl})
  } 
  catch (err) {

    return res.status(400).json(err)
  }
}

export default createController
