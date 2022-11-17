import cookieParser from "cookie-parser"
import express from "express"
import morgan from "morgan"
import cors from "cors"

import authRoutes from "./routes/auth.routes.js"
import modelRoutes from "./routes/model.routes.js"
import dummyRoutes from "./routes/index.js"
import projectRoutes from "./routes/project.routes.js"
import organizationRoutes from "./routes/organization.routes.js"
import userRoutes from "./routes/user.routes.js"
import { PORT, ORIGIN } from "./config/config.js"

const app = express()

// Settings
app.set("port", PORT)
app.set("json spaces", 4)

// Extra settings and utils middlewares
app.use(cors({ origin: ORIGIN, credentials: true }))
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/models", modelRoutes)
app.use("/api/dummy", dummyRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/organizations", organizationRoutes)
app.use("/api/user", userRoutes)

export default app
