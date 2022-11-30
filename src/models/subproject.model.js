const SubProjectModel = (sequelize, type) => {
    return sequelize.define("subProject", {
      id: {
        type: type.UUID,
        defaultValue: type.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: type.STRING,
        allowNull: { args: false, msg: "Title provided can't be empty" },
        unique: { args: true, msg: "The Title is already in use" }, 
        validate: {
          notEmpty: { args: true, msg: "Title provided can't be empty" },
        },
      },
      description: {
        type: type.TEXT,
        allowNull: { args: false, msg: "Description provided can't be empty" }, 
        validate: {
          notEmpty: { args: true, msg: "Description provided can't be empty" },
        },
      },
    })
  
  }
  
  export default SubProjectModel