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
      allowNull: { args: false, msg: "Name provided can't be empty" },
      validate: {
        notEmpty: { args: true, msg: "Name provided can't be empty" },
        len: { args: /^\w{2,30}$/, msg: "Name cannot be longer than 30 characters" },
      },
    },
    description: {
      type: type.STRING,
      allowNull: true,
      validate: {
        len: { args: /^\w{2,150}$/, msg: "Description cannot be longer than 150 characters" },
      },
    },
    location: {
      type: type.STRING,
      allowNull: true,
    },
    imgLocation: {
      type: type.STRING,
      allowNull: true,
      validate: {
        isUrl: { args: true, msg: "Url provided is not valid" },
      },
    },
  })
}

export default ProjectModel
