
const deleteController = async (req, res) => {

    try {
    const organization = await Organization.findOne({
        attributes: ['id', 'name','description']})


      return res
        .status(201)
        .json({ organization})
    } 
    catch (err) {
  
      return res.status(400).json(err)
    }
  }
  
  export default deleteController
