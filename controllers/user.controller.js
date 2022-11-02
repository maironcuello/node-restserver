const { request, response } = require('express');



const userGet = (req = request, res = response) => {

    const { q, name='', key } = req.query;
    res.json({
        "msg": "GET api from  user controller",
        q, name, key
        
    })
};

// We need implement more security in req
const userPost = (req, res = response) => {
    // We do destruction for controller and filter data 
    const { name, age } = req.body;  
    res.json({
        "msg": "POST api from  user controller",
        name, age                  
    });
};

const userPut       = (req, res = response) => {

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
