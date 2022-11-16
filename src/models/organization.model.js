const OrganizationModel = (sequelize, type) => {
  return sequelize.define("organization", {
    id: {
      type: type.UUID,
      defaultValue: type.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: type.STRING,
      allowNull: { args: false, msg: "Organization name can't be empty" },
      validate: {
        notEmpty: { args: true, msg: "Organization name can't be empty" },
      },
    },
    email: {
      type: type.STRING,
      allowNull: true,
      validate: {
        isEmail: { args: true, msg: "Email provided is not valid" },
      },
    },
    description: {
      type: type.TEXT,
      allowNull: true,
      validate: {
        len: { args: [0, 250], msg: "Description can't be longer than 250 characters" },
      },
    },
    websiteUrl: {
      type: type.STRING,
      allowNull: true,
      validate: {
        isUrl: { args: true, msg: "Website provided is not valid" },
      },
    },
    imgUrl: {
      type: type.STRING,
      allowNull: true,
      validate: {
        isUrl: { args: true, msg: "Image provided is not valid" },
      },
    },
  })
}

export default OrganizationModel
