const app = require("./app");
const sequelize = require("./src/config/db");
require("./src/models/associations")

const PORT = process.env.PORT || 5000;

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("Error al sincronizar BD:", err));
