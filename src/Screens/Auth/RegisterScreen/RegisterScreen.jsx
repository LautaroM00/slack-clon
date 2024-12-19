import React from 'react'
import useFetch from '../../../Hooks/useFetch'
import { NavLink, useNavigate } from 'react-router-dom'
import { Form } from '../../../Components/Form/Form'
import { useModalContext } from '../../../Context/ModalContext'

const RegisterScreen = () => {
    const { customFetch } = useFetch()
    const { showModal } = useModalContext()

    const navigate = useNavigate()

    const formData = {
        title: 'Registrarme',
        divs: [
            {
                labelProps: {
                    htmlFor: 'name'
                },
                labelText: 'Nombre:',
                inputProps: {
                    id: 'name',
                    name: 'name',
                }
            },
            {
                labelProps: {
                    htmlFor: 'email'
                },
                labelText: 'Email:',
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
                labelText: 'Repita su password:',
                inputProps: {
                    id: 'passwordRepeat',
                    name: 'passwordRepeat',
                    type: 'password'
                }
            }
        ]
    }

    const registerAction = async (formState) => {

        if (formState.password !== formState.passwordRepeat) {
            return showModal({
                message: 'Las contraseñas no coinciden.',
                type: 'error'
            })
        }

        const serverResponse = await customFetch('/api/auth/register', 'POST', formState)

        if (serverResponse.ok) {
            return showModal({
                message: serverResponse.message,
                type: 'success',
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
        email: '',
        password: '',
        passwordRepeat: ''
    }


    return (
        <Form formData={formData} initialFormState={initialFormState} action={registerAction}>
            <div className='childrenDiv'>
                <button>Registrarme</button>
                <NavLink to={'/login'}>Ya tengo cuenta</NavLink>
            </div>
        </Form>
    )
}

export default RegisterScreen