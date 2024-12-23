import React from 'react'
import useFetch from '../../Hooks/useFetch'
import { NavLink } from 'react-router-dom'
import { Form } from '../../Components/Form/Form'
import FormDivProps from '../../Utils/CustomFormData'
import { useModalContext } from '../../Context/ModalContext'

const ForgotPasswordScreen = () => {
    const { customFetch } = useFetch()
    const { showModal, handleBackground } = useModalContext()

    const formData = {
        title: 'Olvidé mi contraseña',
        divs: [
            new FormDivProps('email', 'Email', 'email').build()
        ]
    }



    const forgotPasswordAction = async (formState) => {
        handleBackground()
        const serverResponse = await customFetch('/api/auth/forgot-password', 'POST', formState)

        serverResponse.ok ?
            showModal({
                message: serverResponse.message,
                type: 'success'
            }) :
            showModal({
                message: serverResponse.message,
                type: 'error'
            })
        return
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