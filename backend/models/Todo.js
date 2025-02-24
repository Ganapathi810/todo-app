const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref : 'User'
        },
        title : {
            type : String,
            minLength : [3,'Title must be at least 3 characters long'],
            maxLength : [100,'Title must not exceed 100 characters long'],
            required : true,
        },
        completed : {
            type : Boolean,
            default : false
        },
        dueDate : {
            type : Date,
            required : true
        },
        order : {
            type : Number,
            required : true
        }
    },
    {
        timestamps : true
    }
)

const Todo = mongoose.model('Todo',todoSchema)


module.exports = Todo
