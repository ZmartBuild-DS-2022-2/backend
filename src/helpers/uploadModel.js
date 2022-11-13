/* eslint-disable no-console */
import { config } from "dotenv"
import { join } from "path"

import CustomException from "./customeException.js"
import uploadFileToS3 from "./s3FileUpload"

// Load environment variables
config()

let gltfFileUrl = ""

const filesValidation = (files) => {
  const filesAsArray = Object.values(files)
  let binFile = false
  let gltfFile = false
  filesAsArray.forEach((element) => {
    if (element.name.split(".")[1] == "bin") {
      if (!binFile) binFile = element
      else throw new CustomException("Received more than one bin file", 400)
    }
    if (element.name.split(".")[1] == "gltf") {
      if (!gltfFile) gltfFile = element
      else throw new CustomException("Received more than one gltf file", 400)
    }
  })

  if (!binFile) throw new CustomException("Must send bin file", 400)
  if (!gltfFile) throw new CustomException("Must send gltf file", 400)
  return [binFile, gltfFile]
}

export const uploadModelFilesToS3 = async (subproject_id, files) => {
  const filesToUpload = filesValidation(files)
  const parameters = { Bucket: process.env.AWS_BUCKET_NAME }
  const folderPath = `models/${subproject_id}/`
  await Promise.all(
    filesToUpload.map(async (file) => {
      const data = (parameters.Key = join(folderPath, file.name))
      await uploadFileToS3({
        file,
        params: parameters,
      })
      if (file.name.split(".")[1] == "gltf") gltfFileUrl = data.Location
    })
  )
  return gltfFileUrl
}
