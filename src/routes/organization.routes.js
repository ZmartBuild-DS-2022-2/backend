
import createOrganizationController from "../controllers/organization/createOrganization.controller.js"
import getOrganizationController from "../controllers/organization/getOrganization.controller.js"
import getOrganizationsController from "../controllers/users/getOrganizations.controller.js"
import updateOrganizationController from "../controllers/organization/updateOrganization.controller.js"
import deleteOrganizationController from "../controllers/organization/deleteOrganization.controller.js"
import addUserOrganizationController from "../controllers/organization/addUserOrganization.controller.js"


import verifyToken from "../middlewares/auth.js"
import verifyOrganizationPermission from "../middlewares/organization.js"

import { Router } from "express"

const router = Router()

router.post("/create",[verifyToken], createOrganizationController)
router.get("/",[verifyToken], getOrganizationsController )
router.get("/:organizationId", [verifyToken, verifyOrganizationPermission], getOrganizationController)
router.patch("/:organizationId", [verifyToken, verifyOrganizationPermission], updateOrganizationController)
router.delete("/:organizationId", [verifyToken, verifyOrganizationPermission], deleteOrganizationController)
router.post("/:organizationId/:userId", [verifyToken, verifyOrganizationPermission], addUserOrganizationController)

export default router