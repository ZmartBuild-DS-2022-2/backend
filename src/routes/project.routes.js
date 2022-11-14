import createProjectController from "../controllers/project/createProject.controller.js"
import getProjectsController from "../controllers/project/getProjects.controller.js"
import getProjectController from "../controllers/project/getProject.controller.js"
import verifyProjectPermmission from "../middlewares/project.js"
import verifyToken from "../middlewares/auth.js"
import { Router } from "express"

const router = Router()

router.post("/create", [verifyToken], createProjectController)
router.get("/:projectId", [verifyToken, verifyProjectPermmission], getProjectController)
router.get("/getAll", [verifyToken], getProjectsController)

export default router
