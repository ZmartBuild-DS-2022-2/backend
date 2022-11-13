import AWS from "aws-sdk"
import { config } from "dotenv"
import CustomException from "./customeException.js"
import { v4 as uuidv4 } from 'uuid'

config()

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
})

const uploadFileToS3 = async function uploadFile({ file, params } = {}) {
  const parameters = { ...params }
  try {
    file.name = `${uuidv4()}.${file.name.split('.')[1]}`
    parameters.Body = file.data
    parameters.ContentType = file.mimetype
    return await s3.upload(parameters).promise()
  } catch (e) {
    throw new CustomException(
      `unable to upload file ${file.name} at ${parameters.Key}, ${e.message}`,
      400
    )
  }
}

export default uploadFileToS3