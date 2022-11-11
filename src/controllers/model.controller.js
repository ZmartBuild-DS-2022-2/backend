import { uploadModelFilesToS3 } from "../helpers/s3FolderUpload.js"

const modelUpload = async (req, res) => {
  const { files } = req
  if (!files) return res.status(400).send("You must send files field")
  if (files.length == 0) return res.status(400).send("No files sended")
  try {
    const gltfFile = await uploadModelFilesToS3("model_id", files)
    res.status(200).json({ gltfFile })
  } catch (err) {
    if (err.code) return res.status(err.code).json(err)
    return res.status(400).json(err)
  }
}

export default modelUpload