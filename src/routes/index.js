import { Router } from "express"

const router = Router()

router.get("/ping", (_, res) => {
  res.status(200).json({ message: "pong" })
})

export default router
