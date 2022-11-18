import dotenv from "dotenv"

// Load environment variables
dotenv.config()

const envVariables = {
  development: {
    PORT: process.env.PORT || 5000,
    ORIGIN: process.env.ORIGIN || "http://localhost:3000",
    JWT_SECRET: process.env.JWT_SECRET,
    DB_USER: process.env.DB_USER || "",
    DB_NAME: process.env.DB_NAME || "",
    DB_PASSWORD: process.env.DB_PASSWORD || "",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT || 5432,
    DB_SSL: process.env.DB_SSL == "true",
    DB_FORCE_RESTART: process.env.DB_FORCE_RESTART == "true",
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || "",
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "",
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
  test: {
    PORT: process.env.PORT || 3000,
    ORIGIN: process.env.ORIGIN || "http://localhost:3000",
    JWT_SECRET: process.env.JWT_SECRET,
    DB_USER: process.env.DB_TEST_USER || "",
    DB_NAME: process.env.DB_TEST_NAME || "",
    DB_PASSWORD: process.env.DB_TEST_PASSWORD || "",
    DB_HOST: process.env.DB_TEST_HOST || "localhost",
    DB_PORT: process.env.DB_TEST_PORT || 5432,
    DB_SSL: process.env.DB_TEST_SSL == "true",
    DB_FORCE_RESTART: true,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || "",
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "",
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
  production: {
    PORT: process.env.PORT || 3000,
    ORIGIN: process.env.ORIGIN || "http://localhost:3000",
    JWT_SECRET: process.env.JWT_SECRET,
    DB_USER: process.env.DB_PROD_USER || "",
    DB_NAME: process.env.DB_PROD_NAME || "",
    DB_PASSWORD: process.env.DB_PROD_PASSWORD || "",
    DB_HOST: process.env.DB_PROD_HOST || "localhost",
    DB_PORT: process.env.DB_PROD_PORT || 5432,
    DB_SSL: process.env.DB_PROD_SSL == "true",
    DB_FORCE_RESTART: process.env.DB_PROD_FORCE_RESTART == "true",
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || "",
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "",
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
}

const env = process.env.NODE_ENV || "development"
export default envVariables[env]
