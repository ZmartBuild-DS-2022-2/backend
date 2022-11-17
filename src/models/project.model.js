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
  })
}

export default ProjectModel
