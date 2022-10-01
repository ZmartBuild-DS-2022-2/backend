import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import index from './routes/index.js'
import { PORT, ORIGIN } from './config/config.js'

const app = express()

// Settings
app.set('port', PORT)
app.set('json spaces', 4)

// Middlewares
app.use(cors({ origin: ORIGIN }))
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/index', index)

export default app
