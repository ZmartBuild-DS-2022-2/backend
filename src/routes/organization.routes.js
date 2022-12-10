import {
  updateOrganizationController,
  createOrganizationController,
  deleteOrganizationController,
  getOrganizationByIdController,
  getUserOrganizationsController,
  getOrganizationProjectsController,
} from "../controllers/organization/index.js"

import { Router } from "express"
import verifyToken from "../middlewares/auth.js"
import verifyReadOrganizationPermission from "../middlewares/organization/readOrganization.js"
import verifyWriteOrganizationPermission from "../middlewares/organization/writeOrganization.js"

const router = Router()

router.post("/", [verifyToken], createOrganizationController)

router.get("/", [verifyToken], getUserOrganizationsController)

router.get(
  "/:organizationId",
  [verifyToken, verifyReadOrganizationPermission],
  getOrganizationByIdController
)

router.get(
  "/:organizationId/projects",
  [verifyToken, verifyReadOrganizationPermission],
  getOrganizationProjectsController
)

router.delete(
  "/:organizationId",
  [verifyToken, verifyWriteOrganizationPermission],
  deleteOrganizationController
)

router.patch(
  "/:organizationId",
  [verifyToken, verifyWriteOrganizationPermission],
  updateOrganizationController
)

export default router
