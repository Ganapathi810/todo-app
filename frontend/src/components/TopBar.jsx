import { useUserContext } from "../hooks/useUserContext";
import logo from '../assets/todoLogo.jpg'
import { useNavigate } from "react-router-dom";

export const TopBar = () => {
  const { user,setUser } = useUserContext();
  const navigate = useNavigate()

    const handleSignout = () => {
      setUser(null)
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('username')
      navigate('/signin')
    }

    return (
        <header className='fixed rounded-full border border-blue-400/40 bg-transparent backdrop-blur-lg  w-11/12 ml-8 mr-8 bg-blue-200 flex items-center justify-between p-2 mt-3 shadow-md'>
          <button 
            onClick={() => window.location.reload()}
            className="flex gap-1"
          >
            <img src={logo} className="h-9 w-9 md:h-10 md:w-10 rounded-xl" />
            <div className='hidden md:hidden lg:block md:ml-3 md:font-semibold md:text-4xl md:tracking-widest' style={{textShadow : '2px 3px white'}}>Todo App</div>
          </button>
          <div className="text-blue text-md sm:text-lg md:text-xl tracking-tighter sm:tracking-normal md:tracking-wide lg:mr-20">Welcome, <span className="text-blue-800">{user?.username}!</span></div>
          <button 
            onClick={handleSignout}
            className="text-black p-2 px-3 text-sm sm:p-2 sm:text-base rounded-2xl bg-blue-400 sm:px-3 md:px-4 hover:bg-blue-500 active:bg-blue-600 mr-2 transition-colors ease-linear"
          >
            Sign out
          </button>
        </header>
    );
} 