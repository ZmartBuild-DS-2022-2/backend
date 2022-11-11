import { uploadModelFilesToS3 } from "../helpers/s3FolderUpload.js"

const modelUpload = async (req, res) => {
  const { files } = req
  if (!files) return res.status(400).send("You must send files field")
  if (files.length == 0) return res.status(400).send("No files sended")
  try {
    const gltfFileUrl = await uploadModelFilesToS3("model_id", files)
    // gltfFileUrl must be saved in the model created
    res.status(200).json({ gltfFileUrl })
  } catch (err) {
    if (err.code) return res.status(err.code).send(err.message)
    return res.status(400).send(err.message)
  }
}

export default modelUpload