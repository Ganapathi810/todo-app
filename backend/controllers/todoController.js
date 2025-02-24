const Todo = require("../models/Todo");

exports.createTodo = async (req,res,next) => {
    try {
        const { title,dueDate,order } = req.body;
        const dueDateInDateType = new Date(dueDate);
        
        const newTodo = await Todo.create({
            userId : req.user.userId,
            title,
            order,
            dueDate : dueDateInDateType,
            completed : false
        })

        res.status(201).json(newTodo)

    } catch (error) {
        next(error);
        console.log('Failed to create todo : ',error)
    }
}

exports.getTodos = async (req,res,next) => {
    try {
        const todos = await Todo.find({ userId : req.user.userId }).sort({ order : 1 })

        res.status(200).json(todos)

    } catch (error) {
        next(error);
        console.log('Failed to get todos : ',error)
    }
}

exports.updateTodoOrder = async (req,res,next) => {
    try {

        const { orderedTodos } = req.body;

        const bulkOperation = orderedTodos.map((todo) => ({
            updateOne : {
                filter : { _id : todo._id},
                update : { $set : { order : todo.order }}
            }
        }))

        await Todo.bulkWrite(bulkOperation)

        res.status(200).json({
            message : 'Todos order has been successfully updated!'
        })

    } catch (error) {
        next(error);
        console.log('Failed to update the order of todos : ',error)
    }
}

exports.updateTodo = async (req,res,next) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id,req.body,{ new : true })
        
        if(!updatedTodo) {
            return res.status(404).json({
                message : 'Todo not found to update!'
            })
        }

        res.status(200).json(updatedTodo)

    } catch (error) {
        next(error);
        console.log('Failed to update todo : ',error)
    }
    
}

exports.deleteTodo = async (req,res,next) => {
    try {
        await Todo.deleteOne({_id : req.params.id});
    
        res.status(200).json({
            message : "Todo deleted successfully!!"
        })

    } catch (error) {
        next(error);
        console.log('Failed to delete todo : ',error)
    }
}