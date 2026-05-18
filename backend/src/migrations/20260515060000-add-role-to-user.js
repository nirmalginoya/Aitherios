'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('Users').catch(() => null);
    if (tableInfo && !tableInfo.role) {
      await queryInterface.addColumn('Users', 'role', {
        type: Sequelize.ENUM('user', 'admin'),
        defaultValue: 'user',
        allowNull: false
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'role');
  }
};
