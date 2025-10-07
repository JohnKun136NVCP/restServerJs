const {response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { body } = require('express-validator');
const usersGet = async (req,res = response) =>{
    //const {q,username, api_key, page=1, limit} = req.query;
    const {limit = 5,start = 0} = req.query;
    const query = {state:true}
    const [total,users]= await Promise.all([User.countDocuments(query)
        ,User.find(query)
            .skip(Number(start))
            .limit(Number(limit))])
    res.json({
        total,
        users
    });
}


const usersPost =  async(req,res = response) =>{
    const {name,email,password,rol} = req.body;
    const user = new User( {name,email,password,rol});


    //Encrypt password
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password,salt);


    //Save db
    await user.save();
    res.json(user)
}

const usersPut = async(req,res = response) =>{
    const {id} = req.params;
    const {_id, password,google,email, ...data } = req.body;

    if(password){
        const salt = bcrypt.genSaltSync(10);
        data.password = bcrypt.hashSync(password,salt);
    }

    const user = await User.findByIdAndUpdate(id,data);

    res.json(user)
}
const usersPatch = (req,res = response) =>{
    res.json({
        msg:"PATCH API - controller"
    })
}

const usersDelete = async(req,res = response) =>{
    const { id } = req.params;
    //Physical method (Not do it)
    //const user = await User.findByIdAndDelete(id);
    const user = await User.findByIdAndUpdate(id,{state: false});

    res.json(user);
}



module.exports = {
    usersGet,
    usersPost,
    usersPatch,
    usersPut,
    usersDelete,
}