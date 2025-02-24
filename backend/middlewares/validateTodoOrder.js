const todoOrderValidationSchema = require("../validations/todoOrderValidationSchema");

const validateTodoOrder = (req,res,next) => {
    const validation = todoOrderValidationSchema.safeParse(req.body);

    if(!validation.success){
        return res.status(400).json({
            message : validation.error.issues[0].message
        })
    }

    next();
}

module.exports = validateTodoOrder