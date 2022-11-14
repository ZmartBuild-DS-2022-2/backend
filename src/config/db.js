import Sequelize from "sequelize"
import UserModel from "../models/user.model.js"
import OrganizationModel from "../models/organization.model.js"
import { DB_USER, DB_NAME, DB_PASSWORD, DB_HOST, DB_PORT } from "./config.js"

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
})

export const User = UserModel(sequelize, Sequelize)
export const Organization = OrganizationModel(sequelize, Sequelize)

//Asociaciones
Organization.belongsToMany(User, { through: 'OrganizationPermission', as: "users" })
User.belongsToMany(Organization, { through: 'OrganizationPermission', as:"organizations" })



sequelize.sync({ force: false }).then(() => {
  // eslint-disable-next-line no-console
  console.log("SERVER (DB): Database synchronized succesfully")
})
