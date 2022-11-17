import getProjectController from "../controllers/project/getProject.controller.js"
import updateProjectController from "../controllers/project/updateProject.controller.js"
import deleteProjectController from "../controllers/project/deleteProject.controller.js"
import addUserController from "../controllers/project/addUser.controller.js"
import verifyReadProjectPermmission from "../middlewares/project/readProject.js"
import verifyWriteProjectPermmission from "../middlewares/project/writeProject.js"
import verifyAdminProjectPermmission from "../middlewares/project/adminProject.js"
import verifyToken from "../middlewares/auth.js"
import { Router } from "express"
import { getUserProjectsController } from "../controllers/project/index.js"

const router = Router()

router.get("/", [verifyToken], getUserProjectsController)
router.get("/:projectId", [verifyToken, verifyReadProjectPermmission], getProjectController)
router.patch("/:projectId", [verifyToken, verifyWriteProjectPermmission], updateProjectController)
router.delete("/:projectId", [verifyToken, verifyAdminProjectPermmission], deleteProjectController)
router.post("/:projectId/addUser", [verifyToken, verifyAdminProjectPermmission], addUserController)

export default router
