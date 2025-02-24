const todoValidationSchema = require("../validations/todoValidation");

const validateTodo = (req,res,next) => {
    const validation = todoValidationSchema.safeParse(req.body);

    if(!validation.success){
        return res.status(400).json({
            message : validation.error.issues[0].message
        })
    }

    next();
}

module.exports = validateTodo