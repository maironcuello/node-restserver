const Role = require('../models/role');
const User = require('../models/user');

// In this part, We verification whit email no registered in database
const emailValidator = async (email) => {
const userEmail = await User.findOne({ email });
if(userEmail) throw new Error(` The ${email } not registered in database`);}

// Here, finding user rol in data en database, 
// this rol, Its value can be USER_ROLE, ADMIN:_ROLE or VENTAS_ROLE
const rolValidators = async(rol) => {
const trueRol = await Role.findOne({ rol });
if (!trueRol) throw new Error(`The ${rol} Its not registered in Database` );}

// Verification if Id is use for an user
const userById = async(id) => {
const  idFromMongo = await User.findById( id );
if (!idFromMongo) throw new Error(`The ${id} is not user-id valid` );}


module.exports = {
    rolValidators,
    emailValidator,
    userById
}