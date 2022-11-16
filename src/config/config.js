import { config } from "dotenv"

// Load environment variables
config()
export const PORT = process.env.PORT || 3000
export const ORIGIN = process.env.ORIGIN || "http://localhost:3000"
export const JWT_SECRET = process.env.JWT_SECRET

// Database environment and configuration variables
export const DB_USER = process.env.DB_USER || ""
export const DB_NAME = process.env.DB_NAME || ""
export const DB_PASSWORD = process.env.DB_PASSWORD || ""
export const DB_HOST = process.env.DB_HOST || "localhost"
export const DB_PORT = process.env.DB_PORT || 5432
export const DB_SSL = process.env.DB_SSL || false
