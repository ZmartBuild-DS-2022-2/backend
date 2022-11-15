import { Organization } from "../../config/db.js";


const showMineController = async (req, res) => {

    try {
    const organizations = await Organization.findAll({
        attributes: ['id', 'name','description']})

    const user = req.currentUser
    console.log(user)

    // const organizations = []
    // org.forEach(element => {
    //     // console.log(element.id)
    //     organizations.push({id:element.id})
    // })
      return res
        .status(201)
        .json({ message: "PONG"})
    } 
    catch (err) {
  
      return res.status(400).json(err)
    }
  }
  
  export default showMineController