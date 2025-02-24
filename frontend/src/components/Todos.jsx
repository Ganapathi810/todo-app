import { Todo } from './Todo';
import { closestCenter, DndContext, DragOverlay } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react';
import api from '../../config/api';

export const Todos = ({ todos,setTodos,editButtonHandler,setSelectedTodoForEditing,searchFilter,statusFilter })  => {
    const [activeTodo,setActiveTodo] = useState(null);

    const handleDragEnd = async (event) => {
        const { active,over } = event;

        if(over && active.id !== over.id) {
            const oldIndex = todos.findIndex((todo) => todo._id === active.id)
            const newIndex = todos.findIndex((todo) => todo._id === over.id)
            if(searchFilter === '' && statusFilter === '') {
                const updatedTodos = arrayMove(todos,oldIndex,newIndex)
                setTodos(updatedTodos)
                const orderedTodos = updatedTodos.map((todo,index) => ({
                    _id : todo._id,
                    order : index
                }))

                await api.post('/api/todos/update-todo-order',{
                    orderedTodos
                })
            }
        }
        setActiveTodo(false)
    }

    const handleDragStart = (e) => {
        setActiveTodo(todos.find((todo) => todo._id === e.active.id))
    }

    return (
        <>
            {todos.length === 0 ? (
                <div className='min-h-[64vh] sm:min-h-[63vh] md:min-h-[79vh] flex items-center justify-center'>
                    <span className='text-md text-blue-900'>{ (searchFilter.length > 0 || statusFilter.length > 0) ? 'No todo match your filter' : "No todos, add them"}</span>
                </div>
            ) : (
                <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                    <SortableContext  items={todos} collisionDetection={closestCenter} strategy={verticalListSortingStrategy}>
                        <div className='min-h-[64vh] sm:min-h-[63vh] md:min-h-[79vh] flex flex-col items-center'>
                            {todos.map((todo) => (
                                <Todo 
                                    setTodos={setTodos} 
                                    key={todo._id} 
                                    todo={todo} 
                                    todos={todos} 
                                    editButtonHandler={editButtonHandler} 
                                    setSelectedTodoForEditing={setSelectedTodoForEditing}
                                />
                            ))}       
                        </div>
                    </SortableContext>
                    <DragOverlay>
                        {activeTodo && (
                            <Todo 
                                setTodos={setTodos} 
                                todos={todos}  
                                todo={activeTodo} 
                                editButtonHandler={editButtonHandler} 
                                setSelectedTodoForEditing={setSelectedTodoForEditing}
                            />
                        )}
                    </DragOverlay>
                </DndContext>
            )}
        </>
    );
}