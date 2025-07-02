import type { Sequelize, Model } from 'sequelize'
import { User } from './User'

export {
  User,
}

export function initModels(sequelize: Sequelize) {
  User.initModel(sequelize)

  return {
    User,
  }
}