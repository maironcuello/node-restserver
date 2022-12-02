const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const validateJwt = async (req = request, res = response, next) => {
  // Get it jwt token from user in the header
  const token = req.header("x-token");
  if (!token)
    return res.status(401).json({ msg: "There is not token in request" });
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    // catch user of uid
    const user = await User.findById(uid);
    // Validate if user is in database
    if (!user)
      return res
        .status(401)
        .json({ msg: "Token no valid - No user in Database " });
    // Validate if user.uid in not false
    if (!user.uid)
      return res
        .status(401)
        .json({ msg: "Token no valid - user status is false" });
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "No valid token" });
  }
};

module.exports = {
  validateJwt,
};
