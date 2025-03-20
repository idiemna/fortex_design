const express = require("express");
const {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");
const {
  validateToken,
  adminOnly,
} = require("../middlewares/authorization");

const router = express.Router();

router.get("/", validateToken, getProperties);
router.get("/:id", validateToken, getPropertyById);
router.post("/", validateToken, adminOnly, createProperty);
router.put("/:id", validateToken, adminOnly, updateProperty);
router.delete("/:id", validateToken, adminOnly, deleteProperty);

module.exports = router;
