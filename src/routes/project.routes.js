import createController from "../controllers/project/create.controller.js"
import getAllController from "../controllers/project/getAll.controller.js"
import getOneController from "../controllers/project/getOne.controller.js"
import verifyToken from "../middlewares/auth.js"
import { Router } from "express"

const router = Router()

router.post("/create", [verifyToken], createController)
router.get("/get", [verifyToken], getOneController)
router.get("/getAll", [verifyToken], getAllController)

export default router
