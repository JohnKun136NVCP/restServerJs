
const {Schema, model} =require('mongoose');

const RoleSchema = Schema({
    rol:{
        type: String,
        require: [true, "Role required"]
    },
});

module.exports = model('Role',RoleSchema);
