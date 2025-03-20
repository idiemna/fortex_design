const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Type = sequelize.define("Type", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  timestamps: false,
});

module.exports = Type;
