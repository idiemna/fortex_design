const validationCreateType = (req, res, next) => {
  const { name, description, properties } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }
  next();
};

const validationUpdateType = (req, res, next) => {
    const { name, description } = req.body;
    if (!name && !description) {
        return res.status(400).json({ error: "No hay campos a actualizar" });
    }
    next();
    }

module.exports = { validationCreateType, validationUpdateType };