module.exports = function(sequelize, DataTypes) {
  var Sequence = sequelize.define("Sequence", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    sequences: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  return Sequence;
};
