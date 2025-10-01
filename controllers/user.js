const {response } = require('express');


const usersGet = (req,res = response) =>{
    const {q,username, api_key, page=1, limit} = req.query;

    res.json({
        msg:"GET API - controller",
        q,
        username,
        api_key,
        page,
        limit
    });
}
const usersPut = (req,res = response) =>{
    const {id} = req.params;
    res.status(500).json({
        msg:"PUT API - controller",
        id
    })
}

const usersPost = (req,res = response) =>{
    const {name,age} = req.body;
    res.status(201).json({
        msg:"POST API - controller",
        name,
        age
    })
}
const usersDelete = (req,res = response) =>{
    res.json({
        msg:"DELETE API - controller"
    })
}

const usersPatch = (req,res = response) =>{
    res.json({
        msg:"PATCH API - controller"
    })
}


module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch
}