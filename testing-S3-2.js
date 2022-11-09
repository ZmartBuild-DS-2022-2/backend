import AWS from 'aws-sdk'
import fs from 'fs'
import { config } from "dotenv"

// Load environment variables
config()

const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const fileName = 'dosperrossur.jpg'
const fileContent = fs.readFileSync(fileName)

const params = {
  Bucket: process.env.AWS_BUCKET_NAME,
  Key: `${fileName}`,
  Body: fileContent
}

console.log(params.Bucket)
console.log(params.Key)

new Promise((resolve) => {
	s3.upload(params, (err, data) => {
		if (err) {
			throw(err)
		}
		resolve(data.Location)
	})
})