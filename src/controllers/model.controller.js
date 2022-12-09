import { uploadModelFilesToS3 } from "../helpers/uploadModel.js"
import { v4 as uuidv4 } from "uuid"

const modelUpload = async (req, res) => {
  const { files } = req
  if (!files) return res.status(400).send("You must send files field")
  if (files.length == 0) return res.status(400).send("No files sended")
  try {
    const subProject_id = uuidv4()
    const gltfFileUrl = await uploadModelFilesToS3(subProject_id, files)
    // gltfFileUrl must be saved in the model created
    res.status(200).json({ gltfFileUrl })
  } catch (err) {
    if (err.code) return res.status(err.code).send(err.message)
    return res.status(400).send(err.message)
  }
}

export default modelUpload
