const DataTypes = require("sequelize").DataTypes;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("saved_books", {
      fields: ["user_id"],
      type: "foreign key",
      name: "saved_books_user_id_fkey",
      references: {
        table: "users",
        field: "id",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "saved_books",
      "saved_books_user_id_fkey"
    );
  },
};
