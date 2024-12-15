import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Workspace, SelectorWorkspace, CrearWorkSpace } from './index.js'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes.jsx'
import { ForgotPasswordScreen, LoginScreen, RegisterScreen, ResetPasswordScreen, VerifyEmailScreen } from './Screens/index.js'

function App() {
    return (
        <Routes>
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/reset-password/:validationToken' element={<ResetPasswordScreen />} />
            <Route path='/verify-email/:verificationToken' element={<VerifyEmailScreen />} />
            <Route path='/forgot-password' element={<ForgotPasswordScreen />} />
            <Route element={<ProtectedRoutes />} >
                <Route path='/' element={<SelectorWorkspace />} />
                <Route path='/workspace/:idWorkspace/:idCanalParams' element={<Workspace />} />
                <Route path='/workspace/new' element={<CrearWorkSpace />} />
            </Route>
        </Routes >
    )
}

export default App
