import {
  addUserToOrganizationController,
  createOrganizationController,
  deleteOrganizationController,
  getOrganizationByIdController,
  getUserOrganizationsController,
} from "../controllers/organization/index.js"
// import createProjectController from "../controllers/project/createProject.controller.js"
import { Router } from "express"
import verifyToken from "../middlewares/auth.js"
import verifyOrganizationPermission from "../middlewares/organization.js"

const router = Router()

router.post("/", [verifyToken], createOrganizationController)
router.get("/", [verifyToken], getUserOrganizationsController)

router.get(
  "/:organizationId",
  [verifyToken, verifyOrganizationPermission],
  getOrganizationByIdController
)

router.delete(
  "/:organizationId",
  [verifyToken, verifyOrganizationPermission],
  deleteOrganizationController
)

router.post(
  "/:organizationId/user",
  [verifyToken, verifyOrganizationPermission],
  addUserToOrganizationController
)

// router.post(
//   "/:organizationId/project",
//   [verifyToken, verifyOrganizationPermission],
//   createProjectController
// )

export default router
