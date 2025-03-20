require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
}));
app.use(cookieParser());
app.use(helmet());

app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/properties", require("./src/routes/propertyRoutes"));
app.use("/api/types", require("./src/routes/typesRoutes"));

module.exports = app;