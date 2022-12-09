import verifyOrganizationPermission from "../middlewares/organization.js"
import verifyToken from "../middlewares/auth.js"
import { Router } from "express"
import {
  getUserProjectsController,
  getProjectByIdController,
  createProjectController,
  deleteProjectController,
  addUserToProjectController,
  getProjectSubprojectsController,
} from "../controllers/project/index.js"

const router = Router()

router.post(
  "/:organizationId",
  [verifyToken, verifyOrganizationPermission],
  createProjectController
)
router.get("/", [verifyToken], getUserProjectsController)

router.get("/:projectId", [verifyToken], getProjectByIdController)

router.delete("/:projectId", [verifyToken], deleteProjectController)

router.get("/:projectId/subprojects", [verifyToken], getProjectSubprojectsController)

router.post("/:projectId/user", [verifyToken], addUserToProjectController)

export default router
