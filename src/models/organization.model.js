const OrganizationModel = (sequelize, type) => {
  const Organization = sequelize.define("organization", {
    id: {
      type: type.UUID,
      defaultValue: type.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    email: {
      type: type.STRING,
      allowNull: { args: false, msg: "Email provided can't be empty" },
      validate: {
        notEmpty: { args: true, msg: "Email provided can't be empty" },
        isEmail: { args: true, msg: "Email provided is not valid" },
      },
    },

    name: {
      type: type.STRING,
      allowNull: { args: false, msg: "Full name provided can't be empty" },
      validate: {
        notEmpty: { args: true, msg: "Full name provided can't be empty" },
      },
    },

    description: {
      type: type.TEXT,
      allowNull: { args: false, msg: "Description provided can't be empty" },
      validate: {
        notEmpty: { args: true, msg: "Description provided can't be empty" },
        len: { args: [2, 150], msg: "Description can not be longer than 150 characters" },
      },
    },

    websiteUrl: {
      type: type.STRING,
      allowNull: true,
      validate: {
        isUrl: { args: true, msg: "website provided is not valid" },
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

  // Organization.belongsToMany(User, { through: 'OrganizationPermission' })

  return Organization
}

export default OrganizationModel
