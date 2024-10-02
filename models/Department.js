// models/Department.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Make sure this path is correct

const Department = sequelize.define('Department', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'departments', // This will create a table called 'departments'
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = Department;
