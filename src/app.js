import cookieParser from "cookie-parser"
import express from "express"
import morgan from "morgan"
import cors from "cors"
import fileupload from "express-fileupload"

import authRoutes from "./routes/auth.routes.js"
import modelRoutes from "./routes/model.routes.js"
import dummyRoutes from "./routes/index.js"
import subprojectRoutes from "./routes/subproject.routes.js"
import projectRoutes from "./routes/project.routes.js"
import organizationRoutes from "./routes/organization.routes.js"
import userRoutes from "./routes/user.routes.js"
import invitationRoutes from "./routes/invitation.routes.js"
import config from "./config/config.js"

const app = express()

// Settings
app.set("port", config.PORT)
app.set("json spaces", 4)

// Extra settings and utils middlewares
app.use(cors({ origin: config.ORIGIN, credentials: true }))
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(fileupload())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/models", modelRoutes)
app.use("/api/dummy", dummyRoutes)
app.use("/api/subprojects", subprojectRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/organizations", organizationRoutes)
app.use("/api/user", userRoutes)
app.use("/api/invitations", invitationRoutes)

export default app
