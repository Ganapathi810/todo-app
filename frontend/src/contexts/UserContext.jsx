import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { passLogout } from "../../config/api";

export const UserContext = createContext({});

export const UserContextProvider = ({ children,setIsSessionExpired }) => {
    const [user,setUser] = useState(() => {
        const token = window.localStorage.getItem('token')
        const username = window.localStorage.getItem('username')
        return token && username ? { token,username} : null
    });
    const navigate = useNavigate();

    useEffect(() => {
        const logout = () => {
            setUser(null)
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('username')
            navigate('/signin')
        }

        const token = window.localStorage.getItem('token')
        let timeout = null;

        if(token) {
            try {
                const decoded = JSON.parse(atob(token.split('.')[1]))
                const expiryTime = decoded.exp * 1000;
                const currentTime = Date.now();
                const timeLeft = expiryTime - currentTime ;

                if(timeLeft > 0) {
                    timeout = setTimeout(() => {
                        setIsSessionExpired(true);
                        setTimeout(() => setIsSessionExpired(false),5000)
                        logout()
                    },timeLeft)
                } else {
                    logout()
                }

            } catch (error) {
                console.log('Failed to decode the token : ',error.message)
            }
        }

        passLogout(logout)

        return () => {
            if(timeout) clearTimeout(timeout)
        }

    },[user])

    useEffect(() => {
        const token = window.localStorage.getItem('token')
        const username = window.localStorage.getItem('username')
        setUser({
            username,
            token
        })
    },[])

    return <UserContext.Provider value={{user,setUser}}>
        { children }
    </UserContext.Provider>
}

