const { response } = require("express");

const adminRole = (req, res = response, next) => {
  if (!req.user) {
    return res
      .status(500)
      .json({ msg: "You try validate user role, without validate jwt" });
  }
  const { rol, name } = req.user;
  if (rol !== "ADMIN_ROLE") {
    return res
      .status(401)
      .json({ msg: "Sorry, The user does not a Admin Role " });
  }
  next();
};

const hasRole = (...roles) => {
  return (req, res = response, next) => {
    console.log(roles);
    if (!roles.includes(req.user.rol)) {
      return res
        .status(401)
        .json({
          msg: `You don't have a valid Role ${req.user.rol}. need ${roles}`,
        });
    }
    next();
  };
};

module.exports = { adminRole, hasRole };
