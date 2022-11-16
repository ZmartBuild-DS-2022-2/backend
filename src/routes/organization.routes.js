import {
  addUserOrganizationController,
  createOrganizationController,
  deleteOrganizationController,
  getOrganizationController,
  getOrganizationsController,
  updateOrganizationController,
} from "../controllers/organization/index.js"
import { Router } from "express"
import verifyToken from "../middlewares/auth.js"
import verifyOrganizationPermission from "../middlewares/organization.js"

const router = Router()

router.post("/", [verifyToken], createOrganizationController)
router.get("/", [verifyToken], getOrganizationsController)
router.get(
  "/:organizationId",
  [verifyToken, verifyOrganizationPermission],
  getOrganizationController
)
router.patch(
  "/:organizationId",
  [verifyToken, verifyOrganizationPermission],
  updateOrganizationController
)
router.delete(
  "/:organizationId",
  [verifyToken, verifyOrganizationPermission],
  deleteOrganizationController
)
router.post(
  "/:organizationId/:userId",
  [verifyToken, verifyOrganizationPermission],
  addUserOrganizationController
)

export default router
