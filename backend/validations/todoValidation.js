const zod = require('zod');

const todoValidationSchema = zod.object({
    title : zod
        .string()
        .trim()
        .min(5,'Title must be at least 5 characters long')
        .max(100,'Title must not exceed 100 characters long').optional(),
    dueDate : zod.preprocess((val) => typeof val === 'string' ? new Date(val) : val,zod.date().optional()),
    completed : zod.optional(zod.boolean()),
    order : zod.optional(zod.number().int().nonnegative())
})

module.exports = todoValidationSchema;