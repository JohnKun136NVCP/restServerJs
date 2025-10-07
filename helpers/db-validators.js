const Role = require('../models/role');
const User = require('../models/user');


const validRole = async (rol = '') =>{
    const existRole = await Role.findOne({rol});
    if(!existRole){
        throw new Error(`This rol ${rol} is not on database` );
    }
}


//Verify if exist the email
const validEmail = async (email) =>{
    const existEmail = await User.findOne({ email});
    if (existEmail){
        throw new Error(`This email (${email}) already exists`);

    }
}

//User by ID
const validUserbyID = async (id) =>{
    const existUser = await User.findById(id);
    if (!existUser){
        throw new Error(`This id (${id}) does not exist`);

    }
}

module.exports={
    validRole,
    validEmail,
    validUserbyID
}