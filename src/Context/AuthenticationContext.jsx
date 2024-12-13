import React, { useContext, useState } from 'react'
import { createContext } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthenticationContext = createContext()

const AuthenticationProvider = ({children}) => {
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(sessionStorage.getItem('accessToken')))

    const login = (accessToken) => {
        sessionStorage.setItem('accessToken', accessToken)
        setIsAuthenticated(true)
        navigate('/')
    }

    const logout = () => {
        sessionStorage.removeItem('accessToken')
        setIsAuthenticated(false)
        navigate('/login')
    }

    return (
        <AuthenticationContext.Provider value={{
            login: login,
            logout: logout,
            isAuthenticated: isAuthenticated
        }}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthenticationContext)

export default AuthenticationProvider