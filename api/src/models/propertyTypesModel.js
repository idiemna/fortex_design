const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Property = require("./propertyModel");
const Type = require("./typesModel");

const PropertyType = sequelize.define("PropertyType", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  property_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Property,
      key: "id",
    },
  },
  type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Type,
      key: "id",
    },
  }
}, {
  timestamps: false,
});


module.exports = PropertyType;
