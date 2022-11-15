
import createController from "../controllers/organization/create.controller.js"
import showAllController from "../controllers/organization/showAll.controller.js"
import showController from "../controllers/organization/show.controller.js"
import showMineController from "../controllers/organization/showMine.controller.js"
import deleteController from "../controllers/organization/delete.controller.js"

// import modifyController from "../controllers/organization/modify.controller.js"

import verifyToken from "../middlewares/auth.js"
import { Router } from "express"
const router = Router()

router.post("/create",[verifyToken], createController)
router.get("/",[verifyToken], showAllController )
router.get("/organization/:id", [verifyToken], showController)
router.get("/mine", [verifyToken], showMineController)

// router.put("/modify", [verifyToken], modifyController)
router.delete("/:organizationId", [verifyToken], deleteController)


export default router