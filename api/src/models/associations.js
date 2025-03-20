const User = require("./userModel");
const Type = require("./typesModel");
const Property = require("./propertyModel");
const PropertyType = require("./propertyTypesModel");

Type.belongsToMany(Property, { through: PropertyType, foreignKey: "type_id", onDelete: "CASCADE" });
Property.belongsToMany(Type, { through: PropertyType, foreignKey: "property_id", onDelete: "CASCADE" });

module.exports = { User, Type, Property, PropertyType };
