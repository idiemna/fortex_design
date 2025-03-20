const Type = require("../models/typesModel");
const Property = require("../models/propertyModel");

const createType = async (req, res) => {
  try {
    const { name, description, properties } = req.body;
    const type = await Type.create({ name, description });
    if (properties && properties.length > 0) {
      await type.setProperties(properties);
    }
    res.status(201).json(type);
  } catch (error) {
    res.status(500).json({ error: "Error al crear tipo" });
  }
};

const getTypes = async (req, res) => {
  try {
    const types = await Type.findAll({ include: Property });
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tipos" });
  }
};

const getTypeById = async (req, res) => {
  try {
    const type = await Type.findByPk(req.params.id, { include: Property });
    if (!type) return res.status(404).json({ error: "Tipo no encontrado" });
    res.json(type);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tipo" });
  }
};

const updateType = async (req, res) => {
  try {
    const { name, description, properties } = req.body;
    const type = await Type.findByPk(req.params.id);
    if (!type) return res.status(404).json({ error: "Tipo no encontrado" });
    
    await type.update({ name, description });
    if (properties) await type.setProperties(properties);
    res.json(type);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar tipo" });
  }
};

const deleteType = async (req, res) => {
  try {
    const type = await Type.findByPk(req.params.id);
    if (!type) return res.status(404).json({ error: "Tipo no encontrado" });
    
    await type.destroy();
    res.json({ message: "Tipo eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar tipo" });
  }
};

module.exports = { createType, getTypes, getTypeById, updateType, deleteType };