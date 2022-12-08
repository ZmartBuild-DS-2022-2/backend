/* eslint-disable no-console */
import { join } from "path"

import CustomException from "./customeException.js"
import uploadFileToS3 from "./s3FileUpload.js"

// Load environment variables

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
  const folderPath = `models/${subproject_id}/`
  await Promise.all(
    filesToUpload.map(async (file) => {
      const extension = file.name.split(".")[1]
      const Key = join(folderPath, file.name)
      const data = await uploadFileToS3(file, { Key: Key })
      if (extension == "gltf") gltfFileUrl = data
    })
  )
  return gltfFileUrl
}
