/* eslint-disable no-console */
import AWS from "aws-sdk"
import { config } from "dotenv"
import { join } from "path"

import CustomException from "./customeException.js"

// Load environment variables
config()

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
})

let gltfFileUrl = ""

const uploadFile = async function uploadFile({ file, params } = {}) {
  const parameters = { ...params }
  try {
    parameters.Body = file.data
    parameters.ContentType = file.mimetype
    const data = await s3.upload(parameters).promise()
    if (file.name.split('.')[1] == "gltf") gltfFileUrl = data.Location

  } catch (e) {
    throw new CustomException(
      `unable to upload file ${file.name} at ${parameters.Key}, ${e.message}`, 400)
  }

  return true
}

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

export const uploadModelFilesToS3 = async (model_id, files) => {

  const filesToUpload = filesValidation(files)
  const parameters = { Bucket: process.env.AWS_BUCKET_NAME }
  const folderPath = `${model_id}/`
  await Promise.all(
    filesToUpload.map(async (file) => {
      parameters.Key = join(folderPath, file.name)
      await uploadFile({
        file,
        params: parameters
      })
    })
  )
  return gltfFileUrl
}
