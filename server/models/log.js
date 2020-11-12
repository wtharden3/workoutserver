const {DataTypes} = require('sequelize');
const db = require('../db');

const Log = db.define('log', {
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  definition: {
    type: DataTypes.STRING,
    allowNull: false
  },
  result: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = Log;