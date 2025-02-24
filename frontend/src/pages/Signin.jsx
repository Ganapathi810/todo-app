import { useState } from 'react'
import backgroundImage from '../assets/todoBackground.jpg'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/todoLogo.jpg'
import api from "../../config/api"
import { useUserContext } from '../hooks/useUserContext';

export const Signin = () => {
    const [formData,setFormData] = useState({
        username : '',
        password : ''
    });
    const [showPassword,setShowPassword] = useState(false);
    const [inputType,setInputType] = useState('password');
    const [error,setError] = useState(null);
    const { setUser } = useUserContext();
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(formData.username.length < 3) {
            setError('Name must be at least 3 characters long.')
            setTimeout(() => setError(null),4000)
            return;
        }

        if(formData.password.length < 6) {
            setError('Password must be at least 6 characters long.')
            setTimeout(() => setError(null),4000)
            return;
        }

        try {
            const response = await api.post('/api/auth/signin',{
                username : formData.username,
                password : formData.password
            })
            console.log(response)
    
            window.localStorage.setItem('token',response.data.token)
            window.localStorage.setItem('username',response.data.user.username)
            setUser({
                username : response.data.user.username,
                token : response.data.token
            })
            navigate('/')
            
        } catch (error) { 
            if(error.response.data.message)
                setError(error.response.data.message)
            else
                setError('Failed to sign in, try again.')
            setTimeout(() => setError(null),4000)
            console.log('Failed to sign in : ',error.response ? error.response.data.message : error.message);
        }
    }


    return (
        <div className='h-screen flex'>
            <div style={{ backgroundImage : `url(${backgroundImage})`}} className='w-screen h-screen md:w-1/2 md:h-full md:flex md:justify-center md:items-center'>
                <div className='hidden md:static md:flex md:items-center md:gap-4'>
                    <img src={logo} className='w-20 h-20 rounded-3xl' />
                    <div style={{textShadow : '3px 3px black'}} className='text-7xl text-blue-600 mb-2'>Todo App</div>
                </div>
            </div>
            <div className='absolute mx-1 mt-1 mb-1 md:ml-0 md:mt-0 md:mx-0 md:mb-0 w-[98vw] h-[99vh] sm:w-[99vw]  sm:h-10/12 md:h-full md:static rounded-md md:rounded-none md:w-1/2 bg-black flex flex-col items-center'>
                <div className='text-3xl text-blue-700 mb-2 font-semibold mt-2 md:hidden'>Todo App</div>
                <img src={logo} className='mt-2 w-11 h-11 rounded-xl md:hidden' />
                <div className='text-blue-400 text-2xl mt-5 md:text-3xl md:mt-20 font-semibold'>Sign in</div>
                <div className='md:text-lg text-blue-200 md:mt-2'>Enter your credentials.</div>
                <form onSubmit={handleSubmit} className='flex flex-col items-center gap-5 w-full px-3 mt-14 md:w-1/2 md:mt-10'>
                    <InputBox placeholder='Name' name='username' value={formData.username} onChange={handleChange}/>
                    <div className='flex border-2 w-full sm:w-3/5 md:w-full border-blue-300/30 rounded focus-within:border-blue-500 hover:border-blue-300'>
                        <input 
                            type={inputType}
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Password'
                            required
                            className="bg-black  p-3 w-11/12 sm:w-11/12  text-white outline-none shrink-0"
                        />
                        { showPassword  ?  (
                            <button 
                                type='button' 
                                className='md:mr-2'
                                onClick={() => {
                                    setInputType('password')
                                    setShowPassword(false)
                                }
                            }>
                                <svg className='w-7 h-7 fill-blue-500'  viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <circle cx="12" cy="12" r="3" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        ) : (
                            <button 
                                type='button' 
                                className='md:mr-2'
                                onClick={() => { 
                                    setInputType('text')
                                    setShowPassword(true)
                                }
                            }>
                                <svg className='w-7 h-7 fill-blue-500 stroke-white' fill='currentColor' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 2L22 22" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        )}
                    </div>
                    <Button className='bg-blue-500 hover:bg-blue-600 active:bg-blue-700 p-3'>Sign in</Button>
                </form>
                <div className='text-blue-200 mt-2'>Don't have an account? <Link to='/signup' className='hover:underline text-blue-400'>Sign up</Link>.</div>
                {error && <div className='flex gap-x-1.5 items-center mt-8 justify-center'>
                    <svg height="32" className='size-4 mt-0.5 ' style={{overflow:"visible",enableBackground :"new"}} viewBox="0 0 32 32" width="32" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g><g id="Error_1_"><g id="Error"><circle cx="16" cy="16" id="BG" r="16" style={{fill:"#D72828"}}/><path d="M14.5,25h3v-3h-3V25z M14.5,6v13h3V6H14.5z" id="Exclamatory_x5F_Sign" style={{fill:"#E6E6E6"}}/></g></g></g></svg>
                    <p className='text-wrap text-red-500 text-center'>{error}</p>
                </div>}
            </div>
        </div>
    )
}