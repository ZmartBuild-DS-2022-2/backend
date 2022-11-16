import { Router } from "express"
import fileupload from "express-fileupload"

import modelUpload from "../controllers/model.controller.js"

const router = Router()

// TODO add verify token middleware
router.post("/upload_model", fileupload(), modelUpload)

export default router
