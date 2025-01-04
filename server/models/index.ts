import type { Sequelize, Model } from 'sequelize'
import { User } from './User'
import { SavedBook } from './SavedBook'

export {
  User,
  SavedBook
}

export function initModels(sequelize: Sequelize) {
  User.initModel(sequelize)
  SavedBook.initModel(sequelize)

  User.hasMany(SavedBook, {
    as: 'savedBooks',
    foreignKey: 'user_id'
  })
  SavedBook.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
  })

  return {
    User,
    SavedBook
  }
}