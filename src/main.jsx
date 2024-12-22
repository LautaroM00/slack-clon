import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthenticationProvider from './Context/AuthenticationContext.jsx'
import ModalProvider from './Context/ModalContext.jsx'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthenticationProvider>
            <ModalProvider>
                <PrimeReactProvider>
                    <App />
                </PrimeReactProvider>
            </ModalProvider>
        </AuthenticationProvider>
    </BrowserRouter>
)
