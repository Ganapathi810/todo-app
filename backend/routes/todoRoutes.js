const express = require('express')
const validateTodo = require('../middlewares/validateTodo')
const validateTodoOrder = require('../middlewares/validateTodoOrder')
const {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    updateTodoOrder
} = require('../controllers/todoController')

const todoRouter = express.Router()

todoRouter.get('/',getTodos)
todoRouter.post('/update-todo-order',validateTodoOrder,updateTodoOrder)
todoRouter.post('/',validateTodo,createTodo)
todoRouter.put('/:id',validateTodo,updateTodo)
todoRouter.delete('/:id',deleteTodo)


module.exports = todoRouter

