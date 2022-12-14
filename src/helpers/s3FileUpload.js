import AWS from "aws-sdk"
import CustomException from "./customeException.js"
import { v4 as uuidv4 } from "uuid"
import config from "../config/config.js"

const s3 = new AWS.S3({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
})

const uploadFileToS3 = async (file, params) => {
  // file attribute contains the file object, must have .data and .mimetype
  // params must contain Key attribute, this contains a string that indicates the path
  // and file name (+ extension)
  // example: params = { Key: "images/organizations/:id/main_image/foto.png" }
  const parameters = { ...params, Bucket: config.AWS_BUCKET_NAME }
  try {
    file.name = `${uuidv4()}.${file.name.split(".")[1]}`
    parameters.Body = file.data
    parameters.ContentType = file.mimetype
    const data = await s3.upload(parameters).promise()
    return data.Location
  } catch (e) {
    throw new CustomException(
      `unable to upload file ${file.name} at ${parameters.Key}, ${e.message}`,
      400
    )
  }
}

export default uploadFileToS3
