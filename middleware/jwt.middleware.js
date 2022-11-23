const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const validateJwt = async(req=request, res=response, next) => {

    // Get the json Web token from header
    const token = req.header('x-token');
    if(!token)return res.status(401).json({msg: 'No token on request'} );
    
    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        // catch user of uid
        const user =  await User.findById(uid);
        req.user =  user; 
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({msg: 'No valid token'});
    }
}

module.exports = {
    validateJwt  
}