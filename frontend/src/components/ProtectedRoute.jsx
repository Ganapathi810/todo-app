import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const token = window.localStorage.getItem('token');

    if(token) {
        return <>{children}</>
    }
    
    return <Navigate to='/signin' />
}