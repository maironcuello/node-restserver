const { Router } = require("express");
const { check } = require("express-validator");

// Middleware ------------------------------------------------
const { validatorInfo } = require("../middleware/user.validator");
// Controllers
const { login } = require("../controllers/auth.controller");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validatorInfo,
  ],
  login
);

module.exports = router;
