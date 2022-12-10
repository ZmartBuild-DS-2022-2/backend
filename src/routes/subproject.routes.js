import verifyToken from "../middlewares/auth.js"
import { Router } from "express"

import {
  createSubprojectController,
  getSubprojectByIdController,
  getUserSubprojectsController,
  deleteSubprojectController,
  updateSubprojectController,
} from "../controllers/subproject/index.js"
import verifyWriteProjectPermission from "../middlewares/project/writeProject.js"
import verifyReadProjectPermission from "../middlewares/project/readProject.js"

const router = Router()

router.post("/:projectId", [verifyToken, verifyWriteProjectPermission], createSubprojectController)

router.get("/", [verifyToken], getUserSubprojectsController)

router.get(
  "/:subprojectId",
  [verifyToken, verifyReadProjectPermission],
  getSubprojectByIdController
)

router.delete(
  "/:subprojectId",
  [verifyToken, verifyWriteProjectPermission],
  deleteSubprojectController
)

router.patch(
  "/:subprojectId",
  [verifyToken, verifyWriteProjectPermission],
  updateSubprojectController
)

export default router
