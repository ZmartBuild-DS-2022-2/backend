import Sequelize from "sequelize"
import {
  UserModel,
  OrganizationModel,
  ProjectModel,
  ProjectPermissionModel,
  ProjectImageModel,
  subProjectModel,
} from "../models/index.js"
import config from "./config.js"

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
  host: config.DB_HOST,
  port: config.DB_PORT,
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: config.DB_SSL,
  },
})

export const User = UserModel(sequelize, Sequelize)
export const Organization = OrganizationModel(sequelize, Sequelize)
export const Project = ProjectModel(sequelize, Sequelize)
export const ProjectPermission = ProjectPermissionModel(sequelize, Sequelize)
export const ProjectImage = ProjectImageModel(sequelize, Sequelize)
export const SubProject = subProjectModel(sequelize, Sequelize)

const ormConfig = async () => {
  //Associations
  User.belongsToMany(Organization, { through: "OrganizationPermission", as: "userOrganizations" })
  Organization.belongsToMany(User, { through: "OrganizationPermission", as: "organizationUsers" })

  Organization.hasMany(Project)
  Project.belongsTo(Organization)

  User.belongsToMany(Project, { through: ProjectPermission, as: "userProjects" })
  Project.belongsToMany(User, { through: ProjectPermission, as: "projectUsers" })

  Project.hasMany(SubProject)
  SubProject.belongsTo(Project)

  Project.hasMany(ProjectImage)
  ProjectImage.belongsTo(Project)

  await sequelize.sync({ force: config.DB_FORCE_RESTART }).then(() => {
    // eslint-disable-next-line no-console
    console.log("SERVER (DB): Database synchronized succesfully")
  })
}

export default ormConfig
