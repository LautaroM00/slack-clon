import React from 'react'
import useFetch from '../../../Hooks/useFetch'
import { NavLink } from 'react-router-dom'
import { Form } from '../../../Components/Form/Form'

const ForgotPasswordScreen = () => {
    const { customFetch } = useFetch()
    const { showModal } = useModalContext()

    const formData = {
        title: 'Olvidé mi contraseña',
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
            }
        ]
    }

    const forgotPasswordAction = async (formState) => {

        const serverResponse = await customFetch('/api/auth/forgot-password', 'POST', formState)

        if (serverResponse.ok) {
            return showModal({
                message: serverResponse.message,
                type: 'success'
            })
        } else {
            return showModal({
                message: serverResponse.message,
                type: 'error'
            })
        }
    }

    const initialFormState = {
        email: ''
    }


    return (
        <Form formData={formData} initialFormState={initialFormState} action={forgotPasswordAction}>
            <div className='childrenDiv'>
                <button>Enviar email de recuperación</button>
                <NavLink to={'/login'}>Recordé mi contraseña</NavLink>
                <NavLink to={'/register'}>No tengo cuenta</NavLink>
            </div>
        </Form>
    )
}

export default ForgotPasswordScreen