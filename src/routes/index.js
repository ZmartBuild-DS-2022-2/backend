import { Router } from 'express'

const router = Router()

/* GET home page. */
router.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' })
})

export default router
