const { Router} = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');

// Middleware ------------------------------------------------
const { validateJwt } = require('../middleware/jwt.middleware');
const { validatorInfo } = require('../middleware/user.validator');

const router = Router();

router.post('/login',[
    // validateJwt,
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validatorInfo
] ,login);

module.exports = router;
