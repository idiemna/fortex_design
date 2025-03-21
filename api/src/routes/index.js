const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "PONG, api fortex design" });
});

module.exports = router;
