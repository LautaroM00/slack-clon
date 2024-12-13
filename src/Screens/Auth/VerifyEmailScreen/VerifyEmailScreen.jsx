import React, { useEffect, useState } from 'react'
import useFetch from '../../../Hooks/useFetch'
import { useParams } from 'react-router-dom'
import useCountdown from '../../../Hooks/useCountdown'

const VerifyEmailScreen = () => {
    const [verificationResult, setVerificationResult] = useState('Cargando...')
    const { verificationToken } = useParams()
    const { fetchFunctions } = useFetch()
    const { countdown } = useCountdown(3)


    const verifyEmail = async (formState) => {

        const resHTTP = await fetchFunctions('/api/auth/verification/' + verificationToken, 'GET', formState)
        const serverResponse = await resHTTP.json()
        return serverResponse
    }

    useEffect(() => {
        verifyEmail()
            .then((serverResponse) => {
                if (serverResponse.ok) {
                    setVerificationResult('Verificación exitosa')
                } else {
                    alert('Error al verificar el email')
                }
            })
    },
        []
    )


    return (
        <div className='formContainer'>
            <div className='verification'>
                <h1>{verificationResult}</h1>
                <span>Será redirigido al <strong>LOGIN</strong> en:</span>
                <strong style={{fontSize: '19px'}}>{countdown}</strong>
            </div>
        </div>
    )
}

export default VerifyEmailScreen