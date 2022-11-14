
import createController from "../controllers/organization/create.controller.js"
// import showController from "../controllers/organization/show.controller.js"
// import modifyController from "../controllers/organization/modify.controller.js"
// import deleteController from "../controllers/organization/delete.controller.js"

import verifyToken from "../middlewares/auth.js"
import { Router } from "express"
const router = Router()

router.post("/create",[verifyToken], createController)
// router.get("/show",[verifyToken], showController)
// router.put("/modify", [verifyToken], modifyController)
// router.delete("/delete", [verifyToken], deleteController)


export default router