const checkFields = require('../middlewares/check-fields');
const validateJWT  = require('../middlewares/validate-jwt');
const  validateRole = require('../middlewares/validate-role');

module.exports = {
    ...checkFields,
    ...validateJWT,
    ...validateRole
}