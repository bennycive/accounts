

// models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(254),
    allowNull: false,
    unique: true, // Consider making this unique
  },
  is_superuser: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  is_staff: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  last_login: {
    type: DataTypes.DATE,
  },
  date_joined: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  department_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'departments', // The table name for the department
      key: 'id', // The key that department_id references
    },
  },
}, {
  tableName: 'users',
  timestamps: true, // If you want to track createdAt and updatedAt
});

// Optionally define associations here
User.associate = (models) => {
  User.belongsTo(models.Department, {
    foreignKey: 'department_id',
    as: 'department', // Alias for the association
  });
};

module.exports = User;
