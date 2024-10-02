const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require("graphql");
const User = require("../models/User");
const Department = require("../models/Department");
const Permission = require("../models/Permission");
const Role = require("../models/Role");
const DepartmentPermission = require("../models/DepartmentPermission");
const GroupPermission = require("../models/GroupPermission");
const UserGroup = require("../models/UserGroup");
const UserPermission = require("../models/UserPermission");

// Define User Type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLInt },
        username: { type: GraphQLString },
        password: { type: GraphQLString }, // Usually sensitive data; handle accordingly
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        is_superuser: { type: GraphQLString }, // Consider changing to Boolean if that's the intent
        is_staff: { type: GraphQLString }, // Consider changing to Boolean if that's the intent
        is_active: { type: GraphQLString }, // Consider changing to Boolean if that's the intent
        last_login: { type: GraphQLString },
        date_joined: { type: GraphQLString },
        department_id: { type: GraphQLInt },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        groups: {
            type: new GraphQLList(GroupPermissionType), // Relation to groups
            resolve(parent, args) {
                return UserGroup.findAll({ where: { user_id: parent.id } });
            }
        },
        permissions: {
            type: new GraphQLList(UserPermissionType), // Relation to permissions
            resolve(parent, args) {
                return UserPermission.findAll({ where: { user_id: parent.id } });
            }
        }
    }),
});


// Define Department Type
const DepartmentType = new GraphQLObjectType({
  name: "Department",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    permissions: {
      type: new GraphQLList(DepartmentPermissionType), // Relation to department permissions
      resolve(parent, args) {
        return DepartmentPermission.findAll({
          where: { departmentId: parent.id }
        });
      }
    }
  })
});

// Define Permission Type
const PermissionType = new GraphQLObjectType({
  name: "Permission",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
});

// Define Role Type
const RoleType = new GraphQLObjectType({
  name: "Role",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    descriptions: { type: GraphQLString },
    permission_id: { type: GraphQLInt }
  })
});

// Define UserGroup Type
const UserGroupType = new GraphQLObjectType({
  name: "UserGroup",
  fields: () => ({
    id: { type: GraphQLInt },
    user_id: { type: GraphQLInt },
    group_id: { type: GraphQLInt }
  })
});

// Define UserPermission Type
const UserPermissionType = new GraphQLObjectType({
  name: "UserPermission",
  fields: () => ({
    id: { type: GraphQLInt },
    user_id: { type: GraphQLInt },
    permission_id: { type: GraphQLInt }
  })
});

// Define GroupPermission Type
const GroupPermissionType = new GraphQLObjectType({
  name: "GroupPermission",
  fields: () => ({
    id: { type: GraphQLInt },
    group_id: { type: GraphQLInt },
    permission_id: { type: GraphQLInt }
  })
});

// Define DepartmentPermission Type
const DepartmentPermissionType = new GraphQLObjectType({
  name: "DepartmentPermission",
  fields: () => ({
    id: { type: GraphQLInt },
    departmentId: { type: GraphQLInt },
    permissionId: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return User.findByPk(args.id); // Fetch user
      }
    },
    department: {
      type: DepartmentType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return Department.findByPk(args.id); // Fetch department
      }
    },
    permission: {
      type: PermissionType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return Permission.findByPk(args.id); // Fetch permission
      }
    },
    role: {
      type: RoleType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return Role.findByPk(args.id); // Fetch role
      }
    }
    // Add more queries as necessary
  }
});

// Mutation
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        department_id: { type: GraphQLInt },
        is_superuser: { type: GraphQLString }, // Change to Boolean if needed
        is_staff: { type: GraphQLString }, // Change to Boolean if needed
        is_active: { type: GraphQLString } // Change to Boolean if needed
      },
      resolve(parent, args) {
        return User.create({
          username: args.username,
          password: args.password,
          first_name: args.first_name,
          last_name: args.last_name,
          email: args.email,
          department_id: args.department_id || null,
          is_superuser: args.is_superuser || false,
          is_staff: args.is_staff || false,
          is_active: args.is_active || true
        });
      }
    },
    addDepartment: {
      type: DepartmentType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Department.create({
          name: args.name,
          description: args.description
        });
      }
    },
    addPermission: {
      type: PermissionType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Permission.create({
          name: args.name,
          description: args.description
        });
      }
    }
    // Add more mutations as necessary
  }
});

// Export schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
