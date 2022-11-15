import createProjectController from "../controllers/project/createProject.controller.js"
import getProjectsController from "../controllers/project/getProjects.controller.js"
import getProjectController from "../controllers/project/getProject.controller.js"
import updateProjectController from "../controllers/project/updateProject.controller.js"
import deleteProjectController from "../controllers/project/deleteProject.controller.js"
import addUserController from "../controllers/project/addUser.controller.js"
import verifyReadProjectPermmission from "../middlewares/project/readProject.js"
import verifyWriteProjectPermmission from "../middlewares/project/writeProject.js"
import verifyAdminProjectPermmission from "../middlewares/project/adminProject.js"
import verifyToken from "../middlewares/auth.js"
import { Router } from "express"

const router = Router()

router.post("/create", [verifyToken], createProjectController)
router.get("/getAll", [verifyToken], getProjectsController)
router.get("/:projectId", [verifyToken, verifyReadProjectPermmission], getProjectController)
router.patch("/:projectId", [verifyToken, verifyWriteProjectPermmission], updateProjectController)
router.delete("/:projectId", [verifyToken, verifyAdminProjectPermmission], deleteProjectController)
router.post("/:projectId/addUser", [verifyToken, verifyAdminProjectPermmission], addUserController)

export default router
