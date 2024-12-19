import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthenticationProvider from './Context/AuthenticationContext.jsx'
import ModalProvider from './Context/ModalContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthenticationProvider>
            <ModalProvider>
                <App />
            </ModalProvider>
        </AuthenticationProvider>
    </BrowserRouter>
)
