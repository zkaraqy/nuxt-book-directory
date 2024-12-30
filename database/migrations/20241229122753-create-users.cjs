const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING(255),
        field: 'name',
        allowNull: false
      },
      username: {
        type: DataTypes.STRING(255),
        field: 'username',
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(255),
        field: 'password',
        allowNull: false
      },
      bio: {
        type: DataTypes.TEXT,
        field: 'bio'
      },
      photo: {
        type: DataTypes.STRING(255),
        field: 'photo'
      },
      email: {
        type: DataTypes.STRING(255),
        field: 'email',
        allowNull: false,
        unique: true
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};