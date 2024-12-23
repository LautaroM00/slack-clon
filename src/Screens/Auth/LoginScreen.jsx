import React from 'react'
import useFetch from '../../Hooks/useFetch'
import { useAuthContext } from '../../Context/AuthenticationContext'
import { NavLink } from 'react-router-dom'
import { Form } from '../../Components/Form/Form'
import { useModalContext } from '../../Context/ModalContext'
import FormDivProps from '../../Utils/CustomFormData'

const LoginScreen = () => {
    const { customFetch } = useFetch()
    const { showModal, handleBackground } = useModalContext()

    const { login } = useAuthContext()

    const formData = {
        title: 'Iniciar sesión',
        divs: [
            new FormDivProps('email', 'Email', 'email').build(),
            new FormDivProps('password', 'Contraseña', 'password').build()
        ]
    }

    const loginAction = async (formState) => {
        handleBackground()
        const serverResponse = await customFetch('/api/auth/login', 'POST', formState)

        serverResponse.ok ?
            showModal({
                message: serverResponse.message,
                type: 'success',
                execute: () => login(serverResponse.payload.accessToken)
            }) :
            showModal({
                message: serverResponse.message,
                type: 'error'
            })
        return
    }

    const initialFormState = {
        email: '',
        password: ''
    }


    return (
        <Form formData={formData} initialFormState={initialFormState} action={loginAction}>
            <div className='childrenDiv'>
                <button>Iniciar sesión</button>
                <NavLink to={'/register'}>Aún no tengo cuenta</NavLink>
                <NavLink to={'/forgot-password'}>Olvidé mi contraseña</NavLink>
            </div>
        </Form>
    )
}

export default LoginScreen