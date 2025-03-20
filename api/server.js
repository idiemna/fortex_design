const app = require("./app");
const { PORT } = require("./src/config/config");
const sequelize = require("./src/config/db");
require("./src/models/associations")

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("Error al sincronizar BD:", err));
