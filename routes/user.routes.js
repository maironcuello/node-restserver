const { Router} = require('express');
const { check } = require('express-validator');
const { userGet, userPost, userPut, userPatch ,userDelete } = require('../controllers/user.controller');

const router = Router();

router.get('/', userGet);
router.post('/',[
    // To use express-validator 
    check('name').not().isEmpty().withMessage({
      message: 'Not a name',
        errorCode: 1,
    }),
    check('password').isLength({min:6}).withMessage({
      message: 'Password minemoun six letter ',
        errorCode: 2,
    }),
    check('email').isEmail().withMessage({
        message: 'Not an email',
        errorCode: 3,
      }),
    check('rol','Its not a valid rol').isIn('ADMIN_ROL','USER_ROL').withMessage({
        message: 'Not is valid rol',
        errorCode: 4,
      })
] ,userPost);
router.put('/:id', userPut);
router.patch('/', userPatch);
router.delete('/', userDelete);


module.exports = router;