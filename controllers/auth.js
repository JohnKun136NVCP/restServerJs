const {response, json} = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req,res = response) =>{
    const {email, password} =req.body;
    try {
        //Email exists
        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({
                msg:"User or password are wrong -email"
            })
        }
        //User online
        
        if (!user.state ){
            return res.status(400).json({
                msg:"User or password are wrong -state:false"
            })
        }



        //Verify password
        const validPassword = bcryptjs.compareSync(password,user.password);
        if (!validPassword){
            return res.status(400).json({
                msg:"User or password are wrong -password"
            })
        }

        //Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error! Please conmunicate with the admin"
        })
    }


}
const googleSignIn = async (req,res =response) =>{
    const {id_token} = req.body;
    
    try {
        const {name,email,picture} = await googleVerify(id_token);
        let user = await User.findone({ email });


        if(!user){
            //Create user
            const data = {
                name,
                email,
                password: "xD",
                picture,
                google: true
            };
            user = new User( data );
            await user.save();
        }

        //User in DB
        if(!user.state){
            return res.status(401).json({
                msg: 'Contact with the administrator, user blocked'
            })
        }

        //Generate JWT
        const token = await generateJWT(user.id);
        res.json({
            user,
            token
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:"Token wrong!"
        })
    }



}



module.exports={
    login,
    googleSignIn
}