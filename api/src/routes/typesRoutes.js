const express = require("express");
const {
  createType,
  getTypes,
  getTypeById,
  updateType,
  deleteType,
} = require("../controllers/typesController");
const { validateToken, adminOnly } = require("../middlewares/authorization");
const { validationCreateType, validationUpdateType } = require("../middlewares/typesMiddlewares");

const router = express.Router();

router.get("/", validateToken, getTypes);
router.get("/:id", validateToken, getTypeById);
router.post("/", validateToken, adminOnly, validationCreateType, createType);
router.put("/:id", validateToken, adminOnly, validationUpdateType, updateType);
router.delete("/:id", validateToken, adminOnly, deleteType);

module.exports = router;
