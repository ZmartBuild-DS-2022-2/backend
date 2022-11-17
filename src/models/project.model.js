import { validateOptionalUrl } from "./utils/validations.js"

const ProjectModel = (sequelize, type) => {
  return sequelize.define("project", {
    id: {
      type: type.UUID,
      defaultValue: type.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: type.STRING,
      allowNull: { args: false, msg: "Project name can't be empty" },
      validate: {
        notEmpty: { args: true, msg: "Project name can't be empty" },
        len: { args: [2, 30], msg: "Project name can't be longer than 30 characters" },
      },
    },
    description: {
      type: type.STRING,
      allowNull: true,
      validate: {
        len: { args: [0, 250], msg: "Description can't be longer than 250 characters" },
      },
    },
    imgsUrls: {
      type: type.STRING(1000),
      allowNull: true,
      validate: {
        isUrlOrEmpty(val, next) {
          if (!val || val === "") {
            return next()
          } else {
            const values = val.split(";")
            values.forEach((element) => {
              if (!validateOptionalUrl(element)) {
                return next(`--  ${element} -- value provided is not a valid URL`)
              }
            })
            return next()
          }
        },
      },
    },
  })
}

export default ProjectModel
