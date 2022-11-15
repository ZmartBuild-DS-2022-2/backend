import { Organization } from "../../config/db.js";

const deleteController = async (req, res) => {
    const id = await req.params.organizationId

    try {
        await Organization.destroy({ where: { id: id } })
        return res.sendStatus(200)

      } catch (err) {
        return res.sendStatus(400).json(err)
        
      }
    }
  
  export default deleteController


  
