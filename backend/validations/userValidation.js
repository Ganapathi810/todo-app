const zod = require('zod');

const userValidationSchema = zod.object({
    username : zod
        .string()
        .trim()
        .min(3,'Name must be at least 3 characters long')
        .max(50,'Name must not exceed 50 characters long'),   
    password : zod
        .string()
        .min(6,'Password must be at least 6 characters long')
})

module.exports = userValidationSchema;