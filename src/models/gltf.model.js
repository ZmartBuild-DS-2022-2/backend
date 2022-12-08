const GltfModel = (sequelize, type) => {
  return sequelize.define("gltfmodel", {
    id: {
      type: type.UUID,
      defaultValue: type.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    url: {
      type: type.STRING,
      allowNull: { args: false, msg: "Model URL can't be empty" },
      validate: {
        notEmpty: { args: true, msg: "Model URL can't be empty" },
        isUrl: { args: true, msg: "URL provided is not valid" },
      },
    },
  })
}

export default GltfModel
