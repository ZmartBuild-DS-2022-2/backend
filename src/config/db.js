import Sequelize from "sequelize"
import UserModel from "../models/user.model.js"
import { DB_USER, DB_NAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_SSL } from "./config.js"

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: DB_SSL,
  },
})

export const User = UserModel(sequelize, Sequelize)

sequelize.sync({ force: false }).then(() => {
  // eslint-disable-next-line no-console
  console.log("SERVER (DB): Database synchronized succesfully")
})
