import verifyToken from "../middlewares/auth.js"
import { Router } from "express"
import {
  createInvitationController,
  getUserInvitationsController,
  updateInvitationController,
} from "../controllers/invitation/index.js"
import verifyInvitationPermission from "../middlewares/invitation.js"

const router = Router()

router.post("/", [verifyToken, verifyInvitationPermission], createInvitationController)
router.get("/", [verifyToken], getUserInvitationsController)

router.patch("/:invitationId", [verifyToken], updateInvitationController)

export default router
