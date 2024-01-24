const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Semester = sequelize.define('Semester', {
  semesterNo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  semesterName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Semester;
