const Property = require("../models/propertyModel");

const createProperty = async (req, res) => {
  try {
    const { name, type } = req.body;

    const existingProperty = await Property.findOne({ where: { name } });
    if (existingProperty) {
      return res.status(400).json({ error: "El nombre de la propiedad ya está en uso" });
    }

    const property = await Property.create({ name, type });
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ error: "Error al crear propiedad" });
  }
};

const getProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener propiedades" });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).json({ error: "Propiedad no encontrada" });
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener propiedad" });
  }
};

const updateProperty = async (req, res) => {
  try {
    const { name, type } = req.body;
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).json({ error: "Propiedad no encontrada" });
    
    if(name){
        const existingProperty = await Property.findOne({ where: { name } });
        if (existingProperty) {
            return res.status(400).json({ error: "El nombre de la propiedad ya está en uso" });
        }
    }

    await property.update({ name, type });
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar propiedad" });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).json({ error: "Propiedad no encontrada" });
    
    await property.destroy();
    res.json({ message: "Propiedad eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar propiedad" });
  }
};

module.exports = { createProperty, getProperties, getPropertyById, updateProperty, deleteProperty };