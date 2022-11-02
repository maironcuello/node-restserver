const { response } = require('express');

const userGet       = (req, res = response) => res.json({"msg": "GET api from  user controller"});
const userPost      = (req, res = response) => res.json({"msg": "POST api from  user controller"});
const userPut       = (req, res = response) => res.json({"msg": "PUT api from  user controller"});
const userPatch     = (req, res = response) => res.json({"msg": "PATH api from  user controller"});
const userDelete    = (req, res = response) => res.json({"msg": "DELETE api from  user controller"});





















module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}
