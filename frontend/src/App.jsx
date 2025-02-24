
import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Home } from './pages/Home'
import { UserContextProvider } from './contexts/UserContext'
import { useState } from 'react'
import { PageNotFound } from './pages/PageNotFound'

function App() {
  const [isSessionExpired,setIsSessionExpired] = useState(false)

    return (
      <>
        <div className='absolute w-full top-6 text-wrap flex justify-center'>
          {isSessionExpired && <span className='bg-white p-2 rounded-md text-center'>Your session has expired, sign in again.</span>}
        </div>
        <UserContextProvider isSessionExpired={isSessionExpired} setIsSessionExpired={setIsSessionExpired}>
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </UserContextProvider>
      </>
)}


export default App
