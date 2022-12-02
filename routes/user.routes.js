// FrameWorks ---------------------------------------------------
const { Router} = require('express');
const { check } = require('express-validator');
// Controllers ---------------------------------------------------
const { userGet, userPost, userPut, userPatch ,userDelete } = require('../controllers/user.controller');
// Helpers ---------------------------------------------------
const { rolValidators, emailValidator, userById  } = require('../helpers/db.validator');
// Middleware ------------------------------------------------
const {validateJwt, validatorInfo, hasRole, adminRole } = require('../middleware')
// Routers ------------------------------------------------
const router = Router();

router.get('/',userGet);
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
  validateJwt,
  // adminRole,
  hasRole('ADMIN_ROLE','VENTAS_ROLE'),
  check('id','Its not valid id').isMongoId(),
  check('id').custom(userById),
  validatorInfo
], userDelete);
router.patch('/', userPatch); 

module.exports = router;