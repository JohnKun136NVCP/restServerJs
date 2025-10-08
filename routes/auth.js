const {Router} = require('express');
const {check} = require('express-validator');
const { login } = require('../controllers/auth');
const { checkFields } = require('../middlewares/check-fields');

const router = Router();

router.post('/login',[
    check('email','Email is required ').isEmail(),
    check('password','Password is required').not().isEmpty(),
    checkFields
],login);


module.exports = router;