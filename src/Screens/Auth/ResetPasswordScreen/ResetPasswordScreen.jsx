import React from 'react'
import useFetch from '../../../Hooks/useFetch'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Form } from '../../../Components/Form/Form'
import { useModalContext } from '../../../Context/ModalContext'

const ResetPasswordScreen = () => {
    const { customFetch } = useFetch()
    const { validationToken } = useParams()
    const { showModal } = useModalContext()
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
            return showModal({
                message: serverResponse.message,
                type: 'error',
                execute: () => navigate('/login')
            })
        } else {
            return showModal({
                message: serverResponse.message,
                type: 'error'
            })
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