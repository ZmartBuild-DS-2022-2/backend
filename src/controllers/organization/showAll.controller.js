import { Organization } from "../../config/db.js";


const showAllController = async (req, res) => {

    try {
    const organizations = await Organization.findAll({
        attributes: ['id', 'name','description']})

    const todo = await Organization.findAll()

    // const organizations = []
    // org.forEach(element => {
    //     // console.log(element.id)
    //     organizations.push({id:element.id})
    // })
    console.log(todo)
      return res
        .status(201)
        .json({ organizations})
    } 
    catch (err) {
  
      return res.status(400).json(err)
    }
  }
  
  export default showAllController

