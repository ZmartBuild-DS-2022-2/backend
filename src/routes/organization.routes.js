import {
  addUserToOrganizationController,
  createOrganizationController,
  getOrganizationByIdController,
  getUserOrganizationsController,
} from "../controllers/organization/index.js"
import createProjectController from "../controllers/project/createProject.controller.js"
import { Router } from "express"
import fileupload from "express-fileupload"
import verifyToken from "../middlewares/auth.js"
import verifyOrganizationPermission from "../middlewares/organization.js"

const router = Router()

router.post("/", [verifyToken], fileupload(), createOrganizationController)
router.get("/", [verifyToken], getUserOrganizationsController)

router.get(
  "/:organizationId",
  [verifyToken, verifyOrganizationPermission],
  getOrganizationByIdController
)

router.post(
  "/:organizationId/user",
  [verifyToken, verifyOrganizationPermission],
  addUserToOrganizationController
)

router.post(
  "/:organizationId/project",
  [verifyToken, verifyOrganizationPermission],
  createProjectController
)

export default router
