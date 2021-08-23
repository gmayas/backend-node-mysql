const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Login, Register } = require("../controllers/users/users.controller");

router.post("/", Register);

router.post("/login", Login);

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;