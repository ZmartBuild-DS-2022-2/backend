import verifyReadProjectPermission from "../middlewares/project/readProject.js"
import verifyWriteProjectPermmission from "../middlewares/project/readProject.js"
import verifyAdminProjectPermmission from "../middlewares/project/readProject.js"
import verifyToken from "../middlewares/auth.js"
import { Router } from "express"
import {
  getUserProjectsController,
  getProjectByIdController,
  createProjectController,
  deleteProjectController,
  addUserToProjectController,
} from "../controllers/project/index.js"

const router = Router()

router.post(
  "/:organizationId",
  [verifyToken, verifyWriteProjectPermmission],
  createProjectController
)
router.get("/", [verifyToken], getUserProjectsController)

router.get("/:projectId", [verifyToken, verifyReadProjectPermission], getProjectByIdController)

router.delete("/:projectId", [verifyToken, verifyWriteProjectPermmission], deleteProjectController)

router.post(
  "/:projectId/user",
  [verifyToken, verifyAdminProjectPermmission],
  addUserToProjectController
)

export default router
