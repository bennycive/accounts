const User = require('./User');
const Role = require('./Role');
const Permission = require('./Permission');
const UserGroup = require('./UserGroup');
const GroupPermission = require('./GroupPermission');
const UserPermission = require('./UserPermission');
const Department = require('./Department'); // Assuming you have a Department model

// Many-to-Many: Users <-> Roles
User.belongsToMany(Role, { through: UserGroup, foreignKey: 'user_id' });
Role.belongsToMany(User, { through: UserGroup, foreignKey: 'role_id' }); // Changed 'group_id' to 'role_id'

// Many-to-Many: Roles <-> Permissions
Role.belongsToMany(Permission, { through: GroupPermission, foreignKey: 'role_id' });
Permission.belongsToMany(Role, { through: GroupPermission, foreignKey: 'permission_id' });

// Many-to-Many: Users <-> Permissions (for individual permissions)
User.belongsToMany(Permission, { through: UserPermission, foreignKey: 'user_id' });
Permission.belongsToMany(User, { through: UserPermission, foreignKey: 'permission_id' });

// Many-to-Many: UserGroups <-> Permissions
UserGroup.belongsToMany(Permission, { through: 'UserGroupPermissions', foreignKey: 'user_group_id' });
Permission.belongsToMany(UserGroup, { through: 'UserGroupPermissions', foreignKey: 'permission_id' });

// Many-to-Many: Departments <-> Permissions
Department.belongsToMany(Permission, { through: 'DepartmentPermissions', foreignKey: 'department_id' });
Permission.belongsToMany(Department, { through: 'DepartmentPermissions', foreignKey: 'permission_id' });

module.exports = {
  User,
  Role,
  Permission,
  UserGroup,
  GroupPermission,
  UserPermission,
  Department
};
