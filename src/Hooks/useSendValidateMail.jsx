import React from 'react'
import useFetch from './useFetch'
import { useModalContext } from '../Context/ModalContext'

const useSendValidateMail = () => {
    const { customFetch } = useFetch()
    const { showModal, handleBackground } = useModalContext()

    const sendValidationEmail = async () => {
        if (confirm('Detectamos que su usuario no se encuentra validado, esto le impide crear workspaces. ¿Desea re-enviar un correo de activación?')) {
            handleBackground()
            const serverResponse = await customFetch('/api/auth/send-verification-email', 'GET')

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
        return
    }

    return {
        sendValidationEmail
    }

}

export default useSendValidateMail