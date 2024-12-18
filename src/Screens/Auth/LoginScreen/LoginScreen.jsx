import React from 'react'
import useFetch from '../../../Hooks/useFetch'
import { useAuthContext } from '../../../Context/AuthenticationContext'
import { NavLink } from 'react-router-dom'
import { Form } from '../../../Components/Form/Form'
import { useModalContext } from '../../../Context/ModalContext'

const LoginScreen = () => {
    const { customFetch } = useFetch()
    const { showModal } = useModalContext()

    const { login } = useAuthContext()

    const formData = {
        title: 'Iniciar sesión',
        divs: [
            {
                labelProps: {
                    htmlFor: 'email'
                },
                labelText: 'Email',
                inputProps: {
                    id: 'email',
                    name: 'email',
                    type: 'email'
                }
            },
            {
                labelProps: {
                    htmlFor: 'password'
                },
                labelText: 'Contraseña',
                inputProps: {
                    id: 'password',
                    name: 'password',
                    type: 'password'
                }
            }
        ]
    }

    const loginAction = async (formState) => {

        const serverResponse = await customFetch('/api/auth/login', 'POST', formState)

        if (serverResponse.ok) {
            return showModal({
                message: serverResponse.message,
                type: 'success',
                execute: () => login(serverResponse.payload.accessToken)
            })
        } else {
            return showModal({
                message: serverResponse.message,
                type: 'error'
            })
        }
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