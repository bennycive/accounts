// models/Permission.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Permission = sequelize.define('Permission', {
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
  },
 
}, {
  tableName: 'permissions', // This will create a table called 'permissions'
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = Permission;
