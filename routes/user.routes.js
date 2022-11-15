const { Router} = require('express');
const { check } = require('express-validator');
const { userGet, userPost, userPut, userPatch ,userDelete } = require('../controllers/user.controller');
const { rolValidators, emailValidator, userById  } = require('../helpers/db-validator');
const { validatorInfo } = require('../middleware/user-validator');

const router = Router();

router.get('/', userGet);
router.post('/',[ // To use express-validator 
  check('name').not().isEmpty(),
  check('password').isLength({min:6}),
  check('email').custom(emailValidator).isEmail(),
  check('rol').custom( rolValidators),
  //Take data from body and validator it's not empty or wrong information  
  validatorInfo
],userPost );

router.put('/:id',[
  // checking if is an id valid
  // checking if there an user with this id. userById   
  check('id','Its not valid id').isMongoId(),
  check('id').custom(userById),
  check('rol').custom( rolValidators),
  validatorInfo
], userPut);

router.delete('/:id',[
  check('id','Its not valid id').isMongoId(),
  check('id').custom(userById),
  validatorInfo
], userDelete);
router.patch('/', userPatch); 

module.exports = router;