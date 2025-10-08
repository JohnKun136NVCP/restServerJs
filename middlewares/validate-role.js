const { response } = require('express');


const isAdminRole = (req, res = response, next) =>{
    if (!req.user){
        return res.status(500).json({
            msg: "Error on Token: Validate token"
        });
    }
    const {rol, name } = req.user;

    if(rol !=='ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${name} is not admin - Error!`
        });
    }

    next();
}

const hasRole =  (...roles) =>{
    return (req,res =response,next) =>{
        if (!req.user){
            return res.status(500).json({
                msg: "Error on Token: Validate token"
            });
        }
        if(!roles.includes(req.user.rol)){
            return res.status(401).json({
                msg:`This service needs ones of these roles ${roles}`
            })
        }
        next();
    }
}


module.exports = {
    isAdminRole,
    hasRole
}