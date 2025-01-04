const DataTypes = require("sequelize").DataTypes;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("saved_books", {
      id: {
        type: DataTypes.INTEGER,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      bookId: {
        type: DataTypes.STRING(255),
        field: "book_id",
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("Favorites", "Readlist"),
        field: "type",
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          "waiting",
          "reading",
          "paused",
          "finished",
          "rereading"
        ),
        field: "status",
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
      userId: {
        type: DataTypes.INTEGER,
        field: "user_id",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("saved_books");
  },
};
