const User = require("../models/User");
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require("../utils/authUtils");

exports.signupUser = async (req,res,next) => {
    try {
        const { username,password } = req.body;

        const existingUser = await User.findOne({ username });

        if(existingUser) {
            return res.status(409).json({
                message : "Username already exists, try another one."
            })
        }

        const hashedPassword = await hashPassword(password);

        if(!hashedPassword) {
            throw new Error('Failed to hash the password')
        }

        const newUser = await User.create({
            username,
            password : hashedPassword
        })

        const token = jwt.sign({ 
            username, 
            userId : newUser._id 
        },
        process.env.JWT_PASSWORD,
        {
            expiresIn : '7d'
        })

        res.status(201).json({
            newUser,
            token
        })
        
    } catch(error) {
        next(error);
        console.log('Failed to sign up : ',error)
    }
}

exports.signinUser = async (req,res,next) => {
    try {
        const { username,password } = req.body;

        const user = await User.findOne({ username });

        if(!user){
            return res.status(404).json({
                message : "User does not exits!"
            })
        }

        const isMatched = await comparePassword(password,user.password)

        if(!isMatched) {
            return res.status(401).json({
                message : "Password is incorrect!"
            })
        }

        const token = jwt.sign({ 
            username, 
            userId : user._id 
        },
        process.env.JWT_PASSWORD,
        {
            expiresIn : '7d'
        })

        res.status(200).json({
            user,
            token
        })

    } catch(error) {
        next(error);
        console.log('Failed to sign in : ',error)
    }
}