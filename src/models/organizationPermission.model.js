const OrganizationPermissionModel = (sequelize, type) => {
  return sequelize.define(
    "organizationPermission",
    {
      role: {
        type: type.STRING,
        allowNull: { args: false, msg: "Role provided can't be empty" },
        validate: {
          notEmpty: { args: true, msg: "Role provided can't be empty" },
          len: { args: /^[awr]{1}$/, msg: "Name must be 'a', 'w' or 'r'" },
        },
      },
    },
    { timestamps: false }
  )
}

export default OrganizationPermissionModel
