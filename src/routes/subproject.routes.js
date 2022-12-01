import verifyToken from "../middlewares/auth.js"
import { Router } from "express"

import { createSubprojectController } from "../controllers/subproject/index.js"

const router = Router()

router.post("/:projectId", [verifyToken], createSubprojectController)

// router.get("/", [verifyToken], getUserSubprojectsController)

// router.get("/:projectId", [verifyToken], getSubprojectByIdController)

// router.delete("/:projectId", [verifyToken], deleteSubprojectController)

export default router
