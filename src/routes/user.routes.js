
import getOrganizationsController from "../controllers/users/getOrganizations.controller.js"

import verifyToken from "../middlewares/auth.js"
import { Router } from "express"

const router = Router()


router.get("/organizations", [verifyToken], getOrganizationsController)

export default router