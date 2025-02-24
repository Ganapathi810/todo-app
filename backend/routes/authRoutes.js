const express = require('express')
const { signupUser, signinUser } = require('../controllers/authController')
const validateUser = require('../middlewares/validateUser')

const authRouter = express.Router()

authRouter.post('/signup',validateUser,signupUser)
authRouter.post('/signin',validateUser,signinUser)


module.exports = authRouter

