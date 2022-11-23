const { validationResult } = require('express-validator');
const { request, response } = require('express');

const validatorInfo = (req = request, res = response, next) => {
    // To use Express-Validator
    const errors = validationResult(req);  
    if(!errors.isEmpty())return res.status(400).json(errors);
    next();
}

module.exports = {
    validatorInfo
}