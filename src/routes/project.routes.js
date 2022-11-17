import verifyReadProjectPermmission from "../middlewares/project/readProject.js"
import verifyToken from "../middlewares/auth.js"
import { Router } from "express"
import {
  getUserProjectsController,
  getProjectByIdController,
} from "../controllers/project/index.js"

const router = Router()

router.get("/", [verifyToken], getUserProjectsController)
router.get("/:projectId", [verifyToken, verifyReadProjectPermmission], getProjectByIdController)

export default router
