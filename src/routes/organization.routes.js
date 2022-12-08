import {
  addUserToOrganizationController,
  createOrganizationController,
  deleteOrganizationController,
  getOrganizationByIdController,
  getUserOrganizationsController,
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

router.delete(
  "/:organizationId",
  [verifyToken, verifyWriteOrganizationPermission],
  deleteOrganizationController
)

router.post(
  "/:organizationId/user",
  [verifyToken, verifyWriteOrganizationPermission],
  addUserToOrganizationController
)

export default router
