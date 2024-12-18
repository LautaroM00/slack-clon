import React from 'react'
import useFetch from '../../../Hooks/useFetch'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Form } from '../../../Components/Form/Form'

const ResetPasswordScreen = () => {
    const { customFetch } = useFetch()
    const { validationToken } = useParams()
    const navigate = useNavigate()

    const formData = {
        title: 'Recuperar contraseña',
        divs: [
            {
                labelProps: {
                    htmlFor: 'password'
                },
                labelText: 'Contraseña:',
                inputProps: {
                    id: 'password',
                    name: 'password',
                    type: 'password'
                }
            },
            {
                labelProps: {
                    htmlFor: 'passwordRepeat'
                },
                labelText: 'Repita su contraseña:',
                inputProps: {
                    id: 'passwordRepeat',
                    name: 'passwordRepeat',
                    type: 'password'
                }
            }
        ]
    }

    const resetPasswordAction = async (formState) => {

        const serverResponse = await customFetch('/api/auth/reset-password/' + validationToken, 'PUT', formState)

        if (serverResponse.ok) {
            alert('Contraseña modificada con éxito.')
            return navigate('/login')
        } else {
            alert(serverResponse.message)
        }
    }

    const initialFormState = {
        password: '',
        passwordRepeat: ''
    }


    return (
        <Form formData={formData} initialFormState={initialFormState} action={resetPasswordAction}>
            <div className='childrenDiv'>
                <button>Cambiar contraseña</button>
                <NavLink to={'/register'}>Aún no tengo cuenta</NavLink>
            </div>
        </Form>
    )
}

export default ResetPasswordScreen