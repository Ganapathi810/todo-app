const userValidationSchema = require('../validations/userValidation')

const validateUser = (req,res,next) => {
    const validation = userValidationSchema.safeParse(req.body);

    if(!validation.success){
        return res.status(400).json({
            message : validation.error.issues[0].message
        })
    }

    next();
}

module.exports = validateUser
