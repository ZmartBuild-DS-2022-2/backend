const UserModel = (sequelize, type) => {
  return sequelize.define("user", {
    id: {
      type: type.UUID,
      defaultValue: type.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: type.STRING,
      allowNull: { args: false, msg: "Email provided can't be empty" },
      unique: { args: true, msg: "The email is already in use" },
      validate: {
        notEmpty: { args: true, msg: "Email provided can't be empty" },
        isEmail: { args: true, msg: "Email provided is not valid" },
      },
    },
    fullname: {
      type: type.STRING,
      allowNull: { args: false, msg: "Full name provided can't be empty" },
      validate: {
        notEmpty: { args: true, msg: "Full name provided can't be empty" },
        is: { args: /^[a-zA-Z ]{2,30}$/, msg: "Full name provided is not valid" },
      },
    },
    password: {
      type: type.STRING,
      allowNull: { args: false, msg: "Password provided can't be empty" },
      validate: {
        notEmpty: { args: true, msg: "Password provided can't be empty" },
      },
    },
  })
}

export default UserModel
