const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  

const Role = sequelize.define('Role', {
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
  descriptions: {
    type: DataTypes.STRING,
    allowNull: false
  },
  permission_id: { // This may not be necessary if using many-to-many
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'permissions', 
      key: 'id'
    }
  }
}, {
  tableName: 'roles',
  timestamps: false
});

module.exports = Role;
