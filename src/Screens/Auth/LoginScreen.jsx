import React from 'react'
import useFetch from '../../Hooks/useFetch'
import { useAuthContext } from '../../Context/AuthenticationContext'
import { NavLink } from 'react-router-dom'
import { Form } from '../../Components/Form/Form'
import { useModalContext } from '../../Context/ModalContext'
import FormDivProps from '../../Utils/CustomFormData'

const LoginScreen = () => {
    const { customFetch } = useFetch()
    const { showModal, handleBackground, checkFields } = useModalContext()

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
        const validateFields = checkFields(formState)
        if (validateFields?.error) {
            return validateFields.showModal()
        }

        const serverResponse = await customFetch('/api/auth/login', 'POST', formState)

        if (serverResponse.ok) {
            serverResponse.payload.isValidated && sessionStorage.setItem('isValidated', 'true')
            showModal({
                message: serverResponse.message,
                type: 'success',
                execute: () => login(serverResponse.payload.accessToken)
            })
        }
        else {
            showModal({
                message: serverResponse.message,
                type: 'error'
            })
        }
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
                <span>
                    Si quiere probar la aplicación sin loguearse use las siguientes credenciales:
                    <p>Email: xd</p>
                    <p>Contraseña: XDDDDDDDD</p>
                </span>
                <NavLink to={'/register'}>Aún no tengo cuenta</NavLink>
                <NavLink to={'/forgot-password'}>Olvidé mi contraseña</NavLink>
            </div>
        </Form>
    )
}

export default LoginScreen