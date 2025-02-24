import { useSortable } from "@dnd-kit/sortable";
import api from "../../config/api"

export const Todo = ({ setTodos,todo,todos,editButtonHandler,setSelectedTodoForEditing }) => {
    const { attributes,listeners,setNodeRef,isDragging, } = useSortable({
        id : todo._id
    })

    const style = {
        opacity : isDragging ? 0 : 1,
    }

    const todoCheckboxHandler = async () => {
        try {
            await api.put(`/api/todos/${todo._id}`,{
                completed : !todo.completed
            })
            setTodos((prevTodos) => prevTodos.map((prevTodo) => prevTodo._id === todo._id ? { ...prevTodo,completed : !prevTodo.completed} : prevTodo)) 

        } catch(error) {
            console.log('Failed to change completed status : ',error.message)
        }
    }

    const todoDeleteHandler = async (id) => {
        try {   
            await api.delete(`/api/todos/${id}`)

            const updatedTodos = todos.filter((todo) => todo._id !== id)

            const orderedTodos = updatedTodos.map((todo,index) => ({
                _id : todo._id,
                order : index
            }))

            if(orderedTodos.length > 0) {
                await api.post('/api/todos/update-todo-order',{
                    orderedTodos
                })
            }
    
            setTodos(updatedTodos)

        } catch(error) {
            console.log('Failed to delete todo : ',error.message)
        }
    }

    return (
        <div ref={setNodeRef}  style={style} className={`${todo.completed ? 'bg-blue-200' : 'bg-blue-100' } flex justify-between w-full p-3 border rounded  shadow-lg mt-3`}>
            <div className="flex flex-col md:gap-1">
                <div className="flex flex-col gap-1 md:flex-row md:gap-3 md:items-center">
                    <input 
                        type='checkbox' 
                        className="size-4 sm:size-5 rounded-full shrink-0" 
                        checked={todo.completed}
                        onChange={todoCheckboxHandler}
                    /> 
                    <h2 className={`${todo.completed ? 'line-through': ''} text-wrap text-sm sm:text-base`}>{todo.title}</h2>
                </div>
                <div className="md:ml-8 text-sm md:text-base text-blue-800">Due date : {new Date(todo.dueDate).toLocaleDateString()}</div>
            </div>
            <div className="flex gap-5 items-center">
                <div {...listeners} {...attributes} className="hover:cursor-grab active:cursor-grabbing">
                    <svg className='w-5 h-5 md:size-6' fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="4" r="1" stroke="black" strokeWidth="2" transform="rotate(90 8 4)"/><circle cx="16" cy="4" r="1" stroke="black" strokeWidth="2" transform="rotate(90 16 4)"/><circle cx="8" cy="12" r="1" stroke="black" strokeWidth="2" transform="rotate(90 8 12)"/><circle cx="16" cy="12" r="1" stroke="black" strokeWidth="2" transform="rotate(90 16 12)"/><circle cx="8" cy="20" r="1" stroke="black" strokeWidth="2" transform="rotate(90 8 20)"/><circle cx="16" cy="20" r="1" stroke="black" strokeWidth="2" transform="rotate(90 16 20)"/>
                    </svg>
                </div>
                <button 
                    onClick={(e) => {
                        e.stopPropagation()
                        setSelectedTodoForEditing(todo) 
                        editButtonHandler()
                    }}
                >
                    <svg className="hover:stroke-blue-600 w-5 h-5 md:size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                </button>
                <button 
                    className="hover:text-blue-600"
                    onClick={() => todoDeleteHandler(todo._id)}
                >
                    <svg className='hover:stroke-blue-600 w-5 h-5 md:size-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
            </div>
        </div>
    )
}