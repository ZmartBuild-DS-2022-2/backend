import Sequelize from "sequelize"
import {
  UserModel,
  OrganizationModel,
  ProjectModel,
  ProjectPermissionModel,
  OrganizationPermissionModel,
  ProjectImageModel,
  SubprojectModel,
  SubprojectImageModel,
  GltfModel,
  InvitationModel,
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
export const OrganizationPermission = OrganizationPermissionModel(sequelize, Sequelize)
export const ProjectImage = ProjectImageModel(sequelize, Sequelize)
export const Subproject = SubprojectModel(sequelize, Sequelize)
export const SubprojectImage = SubprojectImageModel(sequelize, Sequelize)
export const Gltf = GltfModel(sequelize, Sequelize)
export const Invitation = InvitationModel(sequelize, Sequelize)

const ormConfig = async () => {
  // Associations
  User.belongsToMany(Organization, { through: OrganizationPermission, as: "userOrganizations" })
  Organization.belongsToMany(User, { through: OrganizationPermission, as: "organizationUsers" })

  Organization.hasMany(Project, { onDelete: "cascade" })
  Project.belongsTo(Organization)

  User.belongsToMany(Project, { through: ProjectPermission, as: "userProjects" })
  Project.belongsToMany(User, { through: ProjectPermission, as: "projectUsers" })

  Project.hasMany(ProjectImage, { onDelete: "cascade" })
  ProjectImage.belongsTo(Project)

  Project.hasMany(Subproject, { onDelete: "cascade" })
  Subproject.belongsTo(Project)

  Subproject.hasMany(SubprojectImage, { onDelete: "cascade" })
  SubprojectImage.belongsTo(Project)

  Subproject.hasMany(Gltf, { onDelete: "cascade" })
  Gltf.belongsTo(Project)

  User.hasMany(Invitation, { onDelete: "cascade" })
  Invitation.belongsTo(User)

  Organization.hasMany(Invitation, { onDelete: "cascade" })
  Project.hasMany(Invitation, { onDelete: "cascade" })
  Invitation.belongsTo(Organization, { foreignKey: "organizationId" })
  Invitation.belongsTo(Project, { foreignKey: "projectId" })

  await sequelize.sync({ force: config.DB_FORCE_RESTART }).then(() => {
    // eslint-disable-next-line no-console
    console.log("SERVER (DB): Database synchronized succesfully")
  })
}

export default ormConfig
