const bcryptjs = require('bcryptjs');
const User = require('../models/user.model');
const { request, response } = require('express');

const userGet = async(req = request, res = response) =>  {
    const {  limit, from } = req.query;
    const query = { state: true };
    const [ getTotalIndex, getUser ] = await Promise.all([
        // get number of register
        User.countDocuments(query),
        // get custom register users
        User.find(query)
        .skip(parseInt( from ))
        .limit(parseInt( limit ))
    ])
    // .then(value => res.json({value}))
    // .catch(reason => {console.log(reason)});  
    
    // TODO NEED - CREATE METHOD FOR COUNT REGISTER ACTIVE NUMBERS IN RESPONSE
    // if(limit != null ){ 
    //     getIndexConsult = parseInt( limit )
    // }else{ 
    //      getIndexConsult = parseInt( from )
    // };
    res.json({
        getTotalIndex,
        // getIndexConsult,
        getUser
        // totalRegisters,
        // getUsers
    });
}

// We need implement more security in req
const userPost = async(req, res = response) => {
    // Extern data
    const { name, email, password, rol } = req.body;
    const user = new User({name,email,password,rol});
    // encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();
    res.json(user);
};

const userPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, ...rest } = req.body;
    if(password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, rest);
    res.json(user);
}

const userDelete = async (req, res = response) => {
    // Updated user how to state = false
    const { id } = req.params;

    // TODO Pending a validation

    const user = await User.findByIdAndUpdate(id, { state: false} );
    const userAuthenticated = req.user;    
    // Delete user to mongodb
    res.json({user, userAuthenticated})
};


const userPatch = (req, res = response) => res.json({"msg": "PATH api from  user controller"});

module.exports = { 
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}
