const { request, response } = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { getJwt } = require("../helpers/jwt.helpers");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // validate if user, email are valid
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "Email / password are not valid - Email" });
    if (!user.state)
      return res.status(400).json({ msg: "You are not activate  - false" });
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword)
      return res.status(400).json({ msg: "Invalid password" });
    
      //TODO To Create a JWT - Json Web token
    const token = await getJwt(user.id);
     
    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "talk with administrator",
    });
  }
};

module.exports = {
  login,
};
