import { loginController } from '../controllers/auth.controller.js'
import { Router } from 'express'

const router = Router()

router.get('/login', loginController)

export default router
