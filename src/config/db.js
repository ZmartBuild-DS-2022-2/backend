import Sequelize from "sequelize"
import {
  UserModel,
  OrganizationModel,
  ProjectModel,
  ProjectPermissionModel,
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
export const ProjectImage = ProjectImageModel(sequelize, Sequelize)
export const Subproject = SubprojectModel(sequelize, Sequelize)
export const SubprojectImage = SubprojectImageModel(sequelize, Sequelize)
export const Gltf = GltfModel(sequelize, Sequelize)
export const Invitation = InvitationModel(sequelize, Sequelize)

const ormConfig = async () => {
  // Associations
  User.belongsToMany(Organization, { through: "OrganizationPermission", as: "userOrganizations" })
  Organization.belongsToMany(User, { through: "OrganizationPermission", as: "organizationUsers" })

  Organization.hasMany(Project)
  Project.belongsTo(Organization)

  User.belongsToMany(Project, { through: ProjectPermission, as: "userProjects" })
  Project.belongsToMany(User, { through: ProjectPermission, as: "projectUsers" })

  Project.hasMany(ProjectImage)
  ProjectImage.belongsTo(Project)

  Project.hasMany(Subproject)
  Subproject.belongsTo(Project)

  Subproject.hasMany(SubprojectImage)
  SubprojectImage.belongsTo(Project)

  Subproject.hasMany(Gltf)
  Gltf.belongsTo(Project)

  User.hasMany(Invitation)
  Invitation.belongsTo(User)

  Invitation.belongsTo(Organization, { foreignKey: "objectiveId" })
  Invitation.belongsTo(Project, { foreignKey: "objectiveId" })

  await sequelize.sync({ force: config.DB_FORCE_RESTART }).then(() => {
    // eslint-disable-next-line no-console
    console.log("SERVER (DB): Database synchronized succesfully")
  })
}

export default ormConfig
