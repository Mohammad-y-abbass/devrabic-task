const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Class = require('./Class');

const Student = sequelize.define(
  'Student',
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    classNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Class,
        key: 'classNo',
      },
    },
    mathGrade: DataTypes.INTEGER,
    physicsGrade: DataTypes.INTEGER,
    chemistryGrade: DataTypes.INTEGER,
    scienceGrade: DataTypes.INTEGER,
    literatureGrade: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: 'Student',
  }
);

Student.belongsTo(Class, { foreignKey: 'classNo', targetKey: 'classNo' });

module.exports = Student;
