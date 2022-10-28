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
export const DB_HOST = process.env.DB_HOST || ""
export const DB_PORT = process.env.DB_PORT || 3306
