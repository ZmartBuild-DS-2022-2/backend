import verifyToken from "../middlewares/auth.js"
import { Router } from "express"

import {
  createSubprojectController,
  getSubprojectByIdController,
  getUserSubprojectsController,
} from "../controllers/subproject/index.js"

const router = Router()

router.post("/:projectId", [verifyToken], createSubprojectController)

router.get("/", [verifyToken], getUserSubprojectsController)

router.get("/:subprojectId", [verifyToken], getSubprojectByIdController)

router.delete("/:subprojectId", [verifyToken])

export default router
