const bcryptjs = require('bcryptjs');
// const bcrypt = require('bcryptjs/dist/bcrypt');
const User = require('../models/user');
const { request, response } = require('express');
const { validationResult } = require('express-validator');

function userGet(req = request, res = response) {

    const { q, name = '', key } = req.query;
    res.json({
        "msg": "GET api from  user controller",
        q, name, key
    });
}

// We need implement more security in req
const userPost = async(req, res = response) => {

    // To use Express-Validator
    const errors = validationResult(req); 
    
    if(!errors.isEmpty())return res.status(400).json(errors);

    // We doing destruction, for controller and filter data 
    const { name, email, password, rol } = req.body;
    // Create a new instance of user model and give 
    const user = new User({name,email,password,rol});

    //Validation email with mongo Method findOne()
    const userEmail = await User.findOne({email});
    if(userEmail)return res.status(400).json({msg:'email is registered'});
    
    // encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    
    await user.save();
    
    res.json({
        "msg": "POST api from  user controller", user                  
    });
};

const userPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        "msg": "PUT api from  user controller",
        id
    })

};
const userPatch     = (req, res = response) => res.json({"msg": "PATH api from  user controller"});
const userDelete    = (req, res = response) => res.json({"msg": "DELETE api from  user controller"});




module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}
