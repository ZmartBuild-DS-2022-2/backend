import { uploadModelFiles } from "../helpers/s3FolderUpload.js"

const modelUpload = async (req, res) => {
  const { files } = req
  if (!files) return res.status(400).send("You must send files field")
  if (files.length == 0) return res.status(400).send("No files sended")
  try {
    const binUrl = uploadModelFiles("project_test", "model_test", files)
    res.status(200).json({ binUrl })
  } catch (err) {
    return res.status(400).json(err)
  }
}

export default modelUpload