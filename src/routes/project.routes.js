import createController from "../controllers/project/create.controller.js"
import verifyToken from "../middlewares/auth.js"
import { Router } from "express"

const router = Router()

router.post("/create", [verifyToken], createController)

export default router
