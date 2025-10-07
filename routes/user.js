const {Router} = require('express');
const {check} = require('express-validator');
const Role = require('../models/role');
const {checkFields} = require('../middlewares/check-fields');
const { validRole, validEmail, validUserbyID } = require('../helpers/db-validators');
const { usersGet, 
        usersPut, 
        usersPost, 
        usersDelete, 
        usersPatch } = require('../controllers/user');
const router = Router(); 
router.get('/', usersGet);

router.post('/',[
        check('name','Name is required').not().isEmpty(),
        //check('email','This email is not validate').isEmail(),
        check('email','This email is not validate').isEmail(),
        check('email').custom(validEmail),
        check('password','The password must be containt over 6 letters').isLength({min: 6}),
        //check('rol', 'Invalid role').isIn('ADMIN_ROLE','USER_ROLE'),
        check('rol').custom(validRole),
        checkFields
],usersPost);
router.put('/:id',[
        check('id','Invalid ID').isMongoId(),
        check('id').custom(validUserbyID),
        check('rol').custom(validRole),
        checkFields
],usersPut);
router.delete('/:id',[
        check('id','Invalid ID').isMongoId(),
        check('id').custom(validUserbyID),
        checkFields
],usersDelete);
router.patch('/',usersPatch);




module.exports = router;