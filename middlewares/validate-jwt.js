const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async(req=request,res=response,next)=>{
    const token = req.header('token');

    if(!token){
        return res.status(401).json({
            msg: "Error! Token invalid"
        });
    }
    try{
        const {uid} = jwt.verify(token,process.env.SECRET_TO_PRIVATE_KEY);
        
        const user = await User.findById(uid);

        if(!user){
            return res.status(401).json({
                msg: "Token invalid - user invalid"
            })
        }

        //Verify if uui is true

        if (!user.state){
            return res.status(401).json({
                msg: "Token invalid - user:False"
            })
        }
        
        
        req.user = user; 


        next();
    }catch(err){
        console.log(err);
        res.status(401).json({
            msg: "Invalid token."
        })
    }
}


module.exports = {
    validateJWT
}