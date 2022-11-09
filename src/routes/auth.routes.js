import registerController from "../controllers/auth/register.controller.js"
import loginController from "../controllers/auth/login.controller.js"
import refreshTokenController from "../controllers/auth/refreshToken.controller.js"
import logoutController from "../controllers/auth/logout.controller.js"
import verifyToken from "../middlewares/auth.js"
import { Router } from "express"

const router = Router()

router.post("/login", loginController)
router.post("/register", registerController)
router.post("/refresh", [verifyToken], refreshTokenController)
router.delete("/logout", [verifyToken], logoutController)

export default router
