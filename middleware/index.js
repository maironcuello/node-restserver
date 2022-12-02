const validateJwt = require("./jwt.middleware");
const userRoles = require("./user-role.middleware");
const validateInfo = require("./user.validator");

module.exports = {
  ...validateJwt,
  ...userRoles,
  ...validateInfo,
};

