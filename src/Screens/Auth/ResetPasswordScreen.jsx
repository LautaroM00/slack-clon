import React from 'react'
import useFetch from '../../Hooks/useFetch'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Form } from '../../Components/Form/Form'
import { useModalContext } from '../../Context/ModalContext'
import FormDivProps from '../../Utils/CustomFormData'

const ResetPasswordScreen = () => {
    const { customFetch } = useFetch()
    const { validationToken } = useParams()
    const { showModal, handleBackground, checkFields } = useModalContext()
    const navigate = useNavigate()

    const formData = {
        title: 'Recuperar contraseña',
        divs: [
            new FormDivProps('password', <span>Contraseña: <i className='italic'>(mayor a 6 caracteres)</i></span>, 'password').build(),
            new FormDivProps('passwordRepeat', 'Repita su contraseña:', 'password').build()
        ]
    }

    const resetPasswordAction = async (formState) => {
        handleBackground()
        const validateFieldsNullish = checkFields(formState)
        if(validateFieldsNullish?.error){
            return validateFieldsNullish.showModal()
        }

        if(formState.password !== formState.passwordRepeat){
            return showModal({
                message: 'Las contraseñas no coinciden.',
                type: 'error'
            })
        }

        const serverResponse = await customFetch('/api/auth/reset-password/' + validationToken, 'PUT', formState)

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
        password: '',
        passwordRepeat: ''
    }


    return (
        <Form formData={formData} initialFormState={initialFormState} action={resetPasswordAction}>
            <div className='childrenDiv'>
                <button>Cambiar contraseña</button>
                <NavLink to={'/register'}>Aún no tengo cuenta</NavLink>
                <NavLink to={'/forgot-password'}>Solicitar re-envio de enlace de recuperación</NavLink>
            </div>
        </Form>
    )
}

export default ResetPasswordScreen