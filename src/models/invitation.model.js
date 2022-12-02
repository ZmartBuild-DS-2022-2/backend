const InvitationModel = (sequelize, type) => {
  return sequelize.define("invitation", {
    id: {
      type: type.UUID,
      defaultValue: type.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: type.STRING,
      allowNull: { args: false, msg: "Invitation type can't be empty" },
      validate: {
        notEmpty: { args: true, msg: "Invitation type can't be empty" },
      },
    },
    accessType: {
      type: type.STRING,
      allowNull: true,
    },
    state: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: "Invitation state can't be empty" },
      },
    },
  })
}

export default InvitationModel
