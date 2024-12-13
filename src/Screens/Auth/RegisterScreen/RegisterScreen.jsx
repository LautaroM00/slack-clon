import React from 'react'
import useFetch from '../../../Hooks/useFetch'
import { NavLink, useNavigate } from 'react-router-dom'
import { Form } from '../../../Components/Form/Form'

const RegisterScreen = () => {
    const { fetchFunctions } = useFetch()

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

        if(formState.password !== formState.passwordRepeat){
            alert('Las contraseñas no coinciden')
            return
        }

        const resHTTP = await fetchFunctions('/api/auth/register', 'POST', formState)

        const serverResponse = await resHTTP.json()

        if (serverResponse.ok) {
            alert('Se ha enviado un email de validación de usuario.')
            navigate('/login')
        } else {
            alert(serverResponse.message)
        }
    }

    const initialFormState = {
        email: '',
        password: '',
        passwordRepeat: ''
    }


    return (
        <Form formData={formData} initialFormState={initialFormState} action={registerAction}>
            <button>Registrarme</button>
            <NavLink to={'/login'}>Ya tengo cuenta</NavLink>
        </Form>
    )
}

export default RegisterScreen