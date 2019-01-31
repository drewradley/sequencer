// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
// var bcrypt = require("bcrypt-nodejs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var Proctor = sequelize.define("Proctor", {
    proctorName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    proctorInstitution: {
      type: DataTypes.STRING,
      allowNull: false
    },
    proctorEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    proctorPhone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    proctorType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    studentEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    studentNameFirst: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    studentNameLast: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    studentAccommodations: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    studentCurCourse: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
  return Proctor;
};
