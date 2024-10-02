// models/DepartmentPermission.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DepartmentPermission = sequelize.define('DepartmentPermission', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  department_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'departments', // Table name
      key: 'id'
    }
  },
  permission_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'permissions', // Table name
      key: 'id'
    }
  }
}, {
  tableName: 'department_permissions', // Use a suitable table name
  timestamps: true
});

module.exports = DepartmentPermission;
