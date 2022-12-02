import verifyToken from "../middlewares/auth.js"
import { Router } from "express"
import {
  createInvitationController,
  getUserInvitationsController,
  updateInvitationController,
} from "../controllers/invitation/index.js"

const router = Router()

router.post("/:invitationId", [verifyToken], createInvitationController)
router.get("/", [verifyToken], getUserInvitationsController)

router.patch("/:invitationId", [verifyToken], updateInvitationController)

export default router
