import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import type { User } from "./User";

type SavedBookAssociations = "user";

export class SavedBook extends Model<
  InferAttributes<SavedBook, { omit: SavedBookAssociations }>,
  InferCreationAttributes<SavedBook, { omit: SavedBookAssociations }>
> {
  declare id: CreationOptional<number>;
  declare bookId: string;
  declare type: "Favorites" | "Readlist";
  declare status: "waiting" | "reading" | "paused" | "finished" | "rereading";
  declare userId: number | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // SavedBook belongsTo User
  declare user?: NonAttribute<User>;
  declare getUser: BelongsToGetAssociationMixin<User>;
  declare setUser: BelongsToSetAssociationMixin<User, number>;
  declare createUser: BelongsToCreateAssociationMixin<User>;

  declare static associations: {
    user: Association<SavedBook, User>;
  };

  static initModel(sequelize: Sequelize): typeof SavedBook {
    SavedBook.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true,
        },
        bookId: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM("Favorites", "Readlist"),
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
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        underscored: true,
        tableName: "saved_books",
      }
    );

    return SavedBook;
  }
}
