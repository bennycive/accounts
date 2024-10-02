'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true,
      },
      descriptions: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      permission_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'permissions', // Ensure this table exists
          key: 'id',
        },
        onUpdate: 'CASCADE', // Optional
        onDelete: 'SET NULL', // Optional
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('roles');
  }
};
