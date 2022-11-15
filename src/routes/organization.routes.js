
import createController from "../controllers/organization/create.controller.js"
import showAllController from "../controllers/organization/showAll.controller.js"
import showController from "../controllers/organization/show.controller.js"
import updateController from "../controllers/organization/update.controller.js"
import deleteController from "../controllers/organization/delete.controller.js"
import addUserController from "../controllers/organization/addUser.controller.js"



import verifyToken from "../middlewares/auth.js"
import verifyOrganizationPermission from "../middlewares/organization.js"

import { Router } from "express"
const router = Router()

router.post("/create",[verifyToken], createController)
router.get("/",[verifyToken], showAllController )
router.get("/:organizationId", [verifyToken, verifyOrganizationPermission], showController)
router.patch("/:organizationId", [verifyToken, verifyOrganizationPermission], updateController)
router.delete("/:organizationId", [verifyToken, verifyOrganizationPermission], deleteController)
router.post("/:organizationId/:userId", [verifyToken, verifyOrganizationPermission], addUserController)

export default router