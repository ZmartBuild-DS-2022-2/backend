import verifyToken from "../middlewares/auth.js"
import verifyReadProjectPermission from "../middlewares/project/readProject.js"
import verifyWriteProjectPermmission from "../middlewares/project/readProject.js"
import { Router } from "express"

import {
  createSubprojectController,
  getSubprojectByIdController,
  getUserSubprojectController,
} from "../controllers/subproject/index.js"

const router = Router()

router.post("/:projectId", [verifyToken, verifyWriteProjectPermmission], createSubprojectController)

router.get("/", [verifyToken, verifyReadProjectPermission], getUserSubprojectController)

router.get(
  "/:subprojectId",
  [verifyToken, verifyReadProjectPermission],
  getSubprojectByIdController
)

router.delete(
  "/:subprojectId",
  [verifyToken, verifyWriteProjectPermmission],
  verifyWriteProjectPermmission
)

export default router
