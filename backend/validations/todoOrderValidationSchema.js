const zod = require('zod');

const todoOrderValidationSchema = zod.object({
    orderedTodos : zod.array(
        zod.object({
            _id : zod.string().trim(),
            order : zod.number().int().nonnegative()
        })
    )
    .nonempty('Todo Order list cannot be empty')
})

module.exports = todoOrderValidationSchema;