import React, { useEffect, useState } from 'react'
import useFetch from '../../../Hooks/useFetch'
import { useParams } from 'react-router-dom'
import useCountdown from '../../../Hooks/useCountdown'

const VerifyEmailScreen = () => {
    const [verificationResult, setVerificationResult] = useState('Cargando...')
    const { verificationToken } = useParams()
    const { customFetch } = useFetch()
    const { countdown } = useCountdown(5)


    const verifyEmail = async (formState) => {

        const serverResponse = await customFetch('/api/auth/verification/' + verificationToken, 'GET', formState)
        return serverResponse
    }

    useEffect(() => {
        verifyEmail()
            .then((serverResponse) => {
                if (serverResponse.ok) {
                    return setVerificationResult(serverResponse.message)
                } else {
                    return setVerificationResult(serverResponse.message)
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
                <strong style={{ fontSize: '19px' }}>{countdown}</strong>
            </div>
        </div>
    )
}

export default VerifyEmailScreen