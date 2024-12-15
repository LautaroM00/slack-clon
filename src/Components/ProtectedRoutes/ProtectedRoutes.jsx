import React from 'react'
import { useAuthContext } from '../../Context/AuthenticationContext'
import { Navigate, Outlet } from 'react-router-dom'
import WorkspaceProvider from '../../Context/WorkspaceContext'

const ProtectedRoutes = () => {

    const { isAuthenticated } = useAuthContext()

    return (
        isAuthenticated ?
            <WorkspaceProvider>
                <Outlet />
            </WorkspaceProvider> :
            <Navigate to={'/login'} />
    )
}

export default ProtectedRoutes