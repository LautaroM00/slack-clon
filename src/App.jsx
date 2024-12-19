import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Workspace, SelectorWorkspace, ModalWorkSpace } from './index.js'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes.jsx'
import { ForgotPasswordScreen, LoginScreen, RegisterScreen, ResetPasswordScreen, VerifyEmailScreen } from './Screens/index.js'
import ModalMensaje from './Components/ModalMensaje/ModalMensaje.jsx'
import { useAuthContext } from './Context/AuthenticationContext.jsx'


function App() {
    const { isAuthenticated } = useAuthContext()
    return (
        <Routes>
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/reset-password/:validationToken' element={<ResetPasswordScreen />} />
            <Route path='/verify-email/:verificationToken' element={<VerifyEmailScreen />} />
            <Route path='/forgot-password' element={<ForgotPasswordScreen />} />
            <Route path='/prueba' element={<ModalMensaje />} />
            {
                isAuthenticated ? 
                <Route path="*" element={<Navigate to="/" />} /> :
                <Route path="*" element={<Navigate to="/login" />} />
            }
            <Route element={<ProtectedRoutes />} >
                <Route path='/' element={<SelectorWorkspace />} />
                <Route path='/workspace/:workspaceName/:idCanal' element={<Workspace />} />
                <Route path='/workspace/:type' element={<ModalWorkSpace />} />
            </Route>
        </Routes >
    )
}

export default App
