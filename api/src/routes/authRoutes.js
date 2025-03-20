const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const { validateToken } = require("../middlewares/authorization");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/profile", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
