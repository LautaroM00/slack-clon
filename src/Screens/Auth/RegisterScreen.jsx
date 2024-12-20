import React from 'react'
import useFetch from '../../Hooks/useFetch'
import { NavLink, useNavigate } from 'react-router-dom'
import { Form } from '../../Components/Form/Form'
import { useModalContext } from '../../Context/ModalContext'
import FormDivProps from '../../Utils/CustomFormData'

const RegisterScreen = () => {
    const { customFetch } = useFetch()
    const { showModal } = useModalContext()

    const navigate = useNavigate()

    const formData = {
        title: 'Registrarme',
        divs: [
            new FormDivProps('name', 'Nombre:').build(),
            new FormDivProps('email', 'Email:', 'email').build(),
            new FormDivProps('password', 'Contraseña:', 'password').build(),
            new FormDivProps('passwordRepeat', 'Repita su password:', 'passwordRepeat').build()
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

    serverResponse.ok ?
        showModal({
            message: serverResponse.message,
            type: 'success',
            execute: () => navigate('/login')
        }) :
        showModal({
            message: serverResponse.message,
            type: 'error'
        })
    return
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