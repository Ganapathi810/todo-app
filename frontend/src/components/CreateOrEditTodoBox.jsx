import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";

export const CreateOrEditTodoBox = ({ existingTodo,onClickButtonHandler,closeEditOrAddTodoBoxHandler,heading,buttonName }) => {
    const [title,setTitle] =useState(existingTodo?.title || '')
    const [dueDate,setDueDate] = useState(existingTodo?.dueDate ||'')
    const dateRef = useRef()
    const [isButtonDisabled,setIsButtonDisabled] = useState(false)

    useEffect(() => {
        setTitle(existingTodo?.title || '')

        if(existingTodo?.dueDate) {
            const formattedDate = existingTodo.dueDate.split('T')[0];
            setDueDate(formattedDate) 
        } else {
            setDueDate('')
        }
    },[])

    useEffect(() => {
        if(title.length < 5  || dueDate === '' || title.length > 100) {
            setIsButtonDisabled(true)
        } else {
            setIsButtonDisabled(false)
        }
    },[title,dueDate])
    
    return <div className='w-full sm:w-2/3 md:w-3/5 lg:w-1/3 mx-3 p-3 rounded-md flex flex-col bg-blue-300 border border-blue-500/40'>
        <div style={{ textShadow : '1.5px 1.5px white'}} className='font-semibold text-xl sm:text-2xl'>{heading}</div>
        <label className="mt-2 ml-1 text-slate-900 font-semibold">Title :</label>
        <input 
            className="border-2 border-indigo-300 rounded p-2 mt-1 outline-none hover:border-blue-400 focus:border-2 focus:border-blue-600"
            type ="text" 
            value={title}
            placeholder="Title must be at a range of 5 to 100 characters only" 
            onChange={(e)=> setTitle(e.target.value)}
        />
        <label className="mt-2 ml-1 text-slate-900 font-semibold text-base">Due date :</label>
        <input 
            ref={dateRef}
            className="mt-1 p-2 border-2 rounded border-indigo-300 outline-none hover:border-blue-400 focus:border-2 focus:border-blue-600"
            type='date'
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="Due date"
        />
        <div className='pt-4 flex gap-5 justify-end mt-1'>
            <Button 
                className='text-blue-600 bg-white border hover:bg-blue-100/5 border-blue-600 active:bg-blue-400 px-4 py-2' 
                onClick={closeEditOrAddTodoBoxHandler}
            >
                Close
            </Button>
            <Button 
                disabled={isButtonDisabled}
                className='text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-4 py-2' 
                onClick={() => {
                    onClickButtonHandler(title,dueDate)
                    closeEditOrAddTodoBoxHandler()
                }}
            >
                {buttonName}
            </Button>
        </div>
    </div>
}