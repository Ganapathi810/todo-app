import { useState,useEffect } from 'react'
import api from "../../config/api"
import { CreateOrEditTodoBox } from '../components/CreateOrEditTodoBox'
import { Todos} from '../components/Todos'
import backGroundImage from '../assets/todoBackground.jpg'
import { TopBar } from '../components/TopBar'

export const Home = () => {
  const [todos,setTodos] = useState([])
    const [isCreateTodoBoxOpen,setIsCreateTodoBoxOpen] = useState(false);
    const [isEditTodoBoxOpen,setIsEditTodoBoxOpen] = useState(false);
    const [selectedTodoForEditing,setSelectedTodoForEditing] = useState('')
    const [searchFilter,setSearchFilter] = useState('');
    const [statusFilter,setStatusFilter] = useState('')
    const [filteredTodos,setFilteredTodos] = useState(todos)
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true)
        api.get('/api/todos')
        .then((response)=>{
            setTodos(response.data)
        })
        .catch(error => {
            console.log("Failed to fetch todos : ",error.response?.data?.message || error.message)
        })
        .finally(() => {
          setLoading(false);
      });

    },[])

    useEffect(() => {
      let updatedTodos = todos.filter((todo) => todo.title.toLowerCase().includes(searchFilter.toLowerCase()))
        if(statusFilter === 'Not completed')
          updatedTodos = updatedTodos.filter((todo) => todo.completed === false)
        else if(statusFilter === 'Completed')
          updatedTodos = updatedTodos.filter((todo) => todo.completed === true)
        
        setFilteredTodos(updatedTodos)
    },[searchFilter,statusFilter,todos])

    const openAddTodoBoxHandler = () => {
        setIsCreateTodoBoxOpen(true)
        setIsEditTodoBoxOpen(false)
    }

    const openEditTodoBoxHandler = () => {
        setIsCreateTodoBoxOpen(false)
        setIsEditTodoBoxOpen(true)
    }
    const closeEditOrAddTodoBoxHandler = () => {
        setIsCreateTodoBoxOpen(false)
        setIsEditTodoBoxOpen(false)
    }

    const addTodoHandler = async (title,dueDate) => {
        try {
          const orderValue = todos.length > 0 ? Math.max(...todos.map((todo) => todo.order)) + 1 : 0

          const response = await api.post('/api/todos',{
            title,
            dueDate,
            order : orderValue
          })

          setTodos((prevTodos) => [ ...prevTodos,response.data]);

        } catch (error) {
          console.log('Failed to add todo : ',error)
        }
    }

    const updateTodoHandler = async (title,dueDate) => {
        try {
          await api.put(`/api/todos/${selectedTodoForEditing._id}`,{
            title,
            dueDate
          })

        setTodos((prevTodos) => prevTodos.map((prevTodo => prevTodo._id  === selectedTodoForEditing._id ? { ...prevTodo,title,dueDate } : prevTodo)));

        } catch(error) {
          console.log('Failed to update todo : ',error.message)
        }
    }


    return (
        <div 
          style={{ backgroundImage : `url(${backGroundImage})`}}
          className='min-h-screen flex flex-col items-center w-screen px-5'
        >
          <TopBar />
          <button className='md:hidden mt-24 flex gap-1 px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 active:bg-blue-400 text-white items-center transition-colors ease-linear'
                  onClick={openAddTodoBoxHandler}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className='text-sm'>Add Todo</span>
          </button>
          <div className='mt-5 md:mt-20 shadow-sm rounded-md bg-indigo-200 w-full sm:w-4/5 md:w-4/5 lg:w-1/2 p-2 md:px-4 md:py-2'>
            <div className='md:flex md:justify-between gap-1 md:gap-x-3'>
              <div className='flex justify-center items-center p-2 border bg-blue-600  text-white rounded'>
                <span className='w-1/2 text-center inline-block tracking-widest md:tracking-tighter text-sm sm:text-base md:mr-1'>Filter by : </span>
                <select className='w-1/2 bg-blue-500 rounded p-1 text-white text-sm sm:text-base md:w-auto' value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value=''>None</option>
                  <option value='Completed'>Completed</option>
                  <option value='Not completed'>Not completed</option>
                </select>
              </div>
              <input
                type='text'
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)} 
                placeholder='Search for a todo'
                className='w-full md:w-0 md:grow mt-2 md:mt-0 text-sm sm:text-base bg-indigo-100 p-2 rounded outline-none border border-blue-300 focus:ring-1'
              />
              <button className='hidden md:flex md:gap-1 md:px-3 md:py-1 md:rounded md:bg-blue-600 md:hover:bg-blue-500 md:active:bg-blue-400 md:text-white md:items-center md:transition-colors md:ease-linear'
                  onClick={openAddTodoBoxHandler}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span className='md:text-base inline-block w-30'>Add Todo</span>
              </button>
            </div>  
            <Todos
              loading={loading} 
              todos={(searchFilter === '' && statusFilter === '') ? todos : filteredTodos} 
              setTodos={setTodos} 
              editButtonHandler={openEditTodoBoxHandler} 
              setSelectedTodoForEditing={setSelectedTodoForEditing}
              searchFilter={searchFilter}
              statusFilter={statusFilter}
            />
          </div>
          {(isCreateTodoBoxOpen || isEditTodoBoxOpen) && (
            <div className='fixed z-20 w-full h-screen flex items-center justify-center bg-black/30'> 
              {isCreateTodoBoxOpen && (
                <CreateOrEditTodoBox 
                  heading={'Task Details'} 
                  buttonName={'Add a todo'}
                  onClickButtonHandler={addTodoHandler} 
                  closeEditOrAddTodoBoxHandler={closeEditOrAddTodoBoxHandler}
                />
              )}
              {isEditTodoBoxOpen && (
                <CreateOrEditTodoBox 
                  heading={'Edit Task Details'} 
                  buttonName={'Save Changes'}
                  existingTodo={selectedTodoForEditing} 
                  onClickButtonHandler={updateTodoHandler} 
                  closeEditOrAddTodoBoxHandler={closeEditOrAddTodoBoxHandler} 
                />
              )} 
            </div>
          )} 
        </div>
    )
}