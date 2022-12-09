import verifyToken from "../middlewares/auth.js"
import { Router } from "express"
import {
  getUserProjectsController,
  getProjectByIdController,
  createProjectController,
  deleteProjectController,
  addUserToProjectController,
} from "../controllers/project/index.js"
import verifyWriteOrganizationPermission from "../middlewares/organization/writeOrganization.js"
import verifyWriteProjectPermission from "../middlewares/project/writeProject.js"
import verifyReadProjectPermission from "../middlewares/project/readProject.js"

const router = Router()

router.post(
  "/:organizationId",
  [verifyToken, verifyWriteOrganizationPermission],
  createProjectController
)
router.get("/", [verifyToken], getUserProjectsController)

router.get("/:projectId", [verifyToken, verifyReadProjectPermission], getProjectByIdController)

router.delete("/:projectId", [verifyToken, verifyWriteProjectPermission], deleteProjectController)

router.post("/:projectId/user", [verifyToken], addUserToProjectController)

export default router
