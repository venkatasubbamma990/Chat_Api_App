var express = require('express');
var router =  express.Router()
const User = require('../models/userModel')
var secretKey = "subbuspark"
const bcrypt = require('bcrypt')
router.get('/',function(req,res){
    res.send('hello world')
})

router.post('/register', async function(req,res){
    console.log(req)
    try{
        const user = await User.findOne({email : req.body.email})
        if(user){
            res.status(400).json({
                status : "failure",
                message : "user already exists",
                data : req.body
            })
        }
        else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            let newUser = new User({
                email : req.body.email,
                name : req.body.name,
                password :  hashedPassword,
                temp_password :  req.body.password
            })
            await newUser.save()
            res.status(201).json({
                status : "success",
                message : "user created successfully",
                newUser : newUser
            })

        }
    }catch(err){
        res.status(400).json({
            status : "failure" , 
            message : err.message
        })
    }

   
   
})

router.post('/login', async function(req,res){
    try{
        const user = await User.findOne({email : req.body.email})
        if(user){
            const isMatch = await bcrypt.compare(req.body.password, user.password)
            if(isMatch){
                res.status(200).json({
                    status : "success",
                    message : "user logged in successfully"
                })
                var session_token = bcrypt.hash(
                    user.password + secretKey,
                    10
                  );
                 // user.sessionToken = session_token;
                 await User.findOneAndUpdate(
                    { _id: user._id }, // Match the user by ID
                    { $set: { sessionToken: session_token } } // Set the new session token
                  );
                  await user.save();
            
            }
            else{
                res.status(400).json({
                    status : "failure",
                    message : "incorrect password",
                    data : req.body,
                   sessionToken: session_token
                })
            }
        }
        else{
            res.status(400).json({
                status : "failure",
                message : "user does not exist",
                data: req.body
            })
        }
    }catch(err){
        res.status(400).json({
            status : "failure",
            message : err.message
        })
    }
})

module.exports = router;