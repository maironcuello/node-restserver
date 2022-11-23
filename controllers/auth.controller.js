const { request, response } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { getJwt } = require('../helpers/jwt.helpers');

const login =  async(req = request, res = response) => {
    const { email, password } = req.body;
    
    try {
        // validate if email is valid
        // ------------------------------------------------------------------
        const user = await User.findOne({ email });
        if(!user)return res.status(400).json({msg: 'Email / password are not valid - Email'});
        // validate if user is activate
        // ------------------------------------------------------------------
        if(!user.state)return res.status(400).json({msg: 'You are not activate  - false'});
        // validate password
        // ------------------------------------------------------------------
        const  validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword)return res.status(400).json({msg : 'Invalid password'});
        // To make a JWT - Json Web token
        // ------------------------------------------------------------------
        
        const token = await getJwt(user.id);
        console.log(token);
        

        res.json({
            user,
            token
        });    

    } catch (error) {
            res.status(500).json({
            msg:'talk with administrator'           
        });
    }
}

module.exports = {
    login
}