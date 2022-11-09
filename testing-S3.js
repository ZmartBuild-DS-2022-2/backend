/* eslint-disable no-console */
import AWS from "aws-sdk"
import fs from "fs"
import { config } from "dotenv"
import { resolve, join } from "path"
import pkg from "node-mime-types"
const { getMIMEType } = pkg

const { readdir } = fs.promises
// Load environment variables
config()

const isDir = (dirPath) => {
  return fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory()
}

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
})

const uploadFile = async function uploadFile({ path, params, options } = {}) {
  const parameters = { ...params }
  const opts = { ...options }

  try {
    const rstream = fs.createReadStream(resolve(path))

    rstream.once("error", (err) => {
      console.error(`unable to upload file ${path}, ${err.message}`)
    })

    parameters.Body = rstream
    parameters.ContentType = getMIMEType(path)
    await s3.upload(parameters, opts).promise()

    // eslint-disable-next-line max-len
    console.info(
      `${parameters.Key} (${parameters.ContentType}) uploaded in bucket ${parameters.Bucket}`
    )
  } catch (e) {
    throw new Error(`unable to upload file ${path} at ${parameters.Key}, ${e.message}`)
  }

  return true
}

// upload directory and its sub-directories if any
const uploadDirectory = async function uploadDirectory({ path, params, options, rootKey } = {}) {
  const parameters = { ...params }
  const opts = { ...options }
  const root = rootKey && rootKey.constructor === String ? rootKey : ""
  let dirPath

  try {
    dirPath = resolve(path)

    if (!isDir(dirPath)) {
      throw new Error(`${dirPath} is not a directory`)
    }

    console.info(`uploading directory ${dirPath}...`)

    const filenames = await readdir(dirPath)

    if (Array.isArray(filenames)) {
      await Promise.all(
        filenames.map(async (filename) => {
          const filepath = `${dirPath}/${filename}`
          if (!isDir(filepath)) {
            parameters.Key = join(root, filename)
            await uploadFile({
              path: filepath,
              params: parameters,
              options: opts,
            })
          } else if (isDir(filepath)) {
            await uploadDirectory({
              params,
              options,
              path: filepath,
              rootKey: join(root, filename),
            })
          }
        })
      )
    }
  } catch (e) {
    throw new Error(`unable to upload directory ${path}, ${e.message}`)
  }

  console.info(`directory ${dirPath} successfully uploaded`)
  return true
}

// example
;(async () => {
  try {
    console.time("s3 upload")

    await uploadDirectory({
      path: "test",
      params: {
        Bucket: process.env.AWS_BUCKET_NAME,
      },
      options: {},
      rootKey: "test",
    })

    console.timeEnd("s3 upload")
  } catch (e) {
    console.error(e)
  }
})()
