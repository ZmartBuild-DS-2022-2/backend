import Sequelize from "sequelize"
import ProjectModel from "../models/project.model.js"
import ProjectPermissionModel from "../models/projectPermission.model.js"
import UserModel from "../models/user.model.js"
import OrganizationModel from "../models/organization.model.js"
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
export const Project = ProjectModel(sequelize, Sequelize)
export const ProjectPermission = ProjectPermissionModel(sequelize, Sequelize)
export const Organization = OrganizationModel(sequelize, Sequelize)

//Associations
User.belongsToMany(Organization, { through: "OrganizationPermission", as: "userOrganizations" })
Organization.belongsToMany(User, { through: "OrganizationPermission", as: "organizationUsers" })

Organization.hasMany(Project)
Project.belongsTo(Organization)

User.belongsToMany(Project, { through: ProjectPermission, as: "userProjects" })
Project.belongsToMany(User, { through: ProjectPermission, as: "projectUsers" })

sequelize.sync({ force: false }).then(() => {
  // eslint-disable-next-line no-console
  console.log("SERVER (DB): Database synchronized succesfully")
})
