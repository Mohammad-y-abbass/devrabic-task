const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Semester = require('./Semester');

const Class = sequelize.define('Class', {
  classNo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  classCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  semesterNo: {
    type: DataTypes.INTEGER,
    references: {
      model: Semester,
      key: 'semesterNo',
    },
    allowNull: false,
  },
});

Class.belongsTo(Semester, {
  foreignKey: 'semesterNo',
  targetKey: 'semesterNo',
});

module.exports = Class;
