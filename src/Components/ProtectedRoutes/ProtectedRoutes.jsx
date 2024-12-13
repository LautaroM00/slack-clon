import React from 'react'
import { useAuthContext } from '../../Context/AuthenticationContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
    
    const { isAuthenticated } = useAuthContext()

    return (
        isAuthenticated ? 
        <Outlet /> :
        <Navigate to={'/login'} />
    )
}

export default ProtectedRoutes