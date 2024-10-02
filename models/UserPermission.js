const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Permission = require('./Permission');

const UserPermission = sequelize.define('UserPermission', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  permission_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Permission,
      key: 'id'
    }
  }
}, {
  tableName: 'auth_user_permissions',
  timestamps: false
});

module.exports = UserPermission;
