import verifyToken from "../middlewares/auth.js"
import { Router } from "express"
import {
  getUserProjectsController,
  getProjectByIdController,
  createProjectController,
  deleteProjectController,
  addUserToProjectController,
} from "../controllers/project/index.js"

const router = Router()

router.post("/:organizationId", [verifyToken], createProjectController)
router.get("/", [verifyToken], getUserProjectsController)

router.get("/:projectId", [verifyToken], getProjectByIdController)

router.delete("/:projectId", [verifyToken], deleteProjectController)

router.post("/:projectId/user", [verifyToken], addUserToProjectController)

export default router
