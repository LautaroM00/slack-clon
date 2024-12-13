import React from 'react'
import useFetch from '../../../Hooks/useFetch'
import { NavLink } from 'react-router-dom'
import { Form } from '../../../Components/Form/Form'

const ForgotPasswordScreen = () => {
    const { fetchFunctions } = useFetch()

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

        const resHTTP = await fetchFunctions('/api/auth/forgot-password', 'POST', formState)

        const serverResponse = await resHTTP.json()

        if (serverResponse.ok) {
            return alert('Se ha enviado un correo de recuperación de contraseña.')
        } else {
            return alert('Error en solicitud')
        }
    }

    const initialFormState = {
        email: ''
    }


    return (
        <Form formData={formData} initialFormState={initialFormState} action={forgotPasswordAction}>
            <button>Enviar email de recuperación</button>
            <NavLink to={'/login'}>Recordé mi contraseña</NavLink>
            <NavLink to={'/register'}>No tengo cuenta</NavLink>
        </Form>
    )
}

export default ForgotPasswordScreen